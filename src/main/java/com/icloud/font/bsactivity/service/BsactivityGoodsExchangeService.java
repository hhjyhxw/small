package com.icloud.font.bsactivity.service;

import com.alibaba.fastjson.JSONObject;
import com.icloud.basecommon.service.redislock.DistributedLock;
import com.icloud.basecommon.service.redislock.DistributedLockUtil;
import com.icloud.basecommon.util.OrderUtil;
import com.icloud.exceptions.BeanException;
import com.icloud.exceptions.SendPrizeException;
import com.icloud.modules.bsactivity.entity.BsactivityGoods;
import com.icloud.modules.bsactivity.entity.BsactivityGoodsqcode;
import com.icloud.modules.bsactivity.entity.BsactivityOrder;
import com.icloud.modules.bsactivity.service.BsactivityGoodsService;
import com.icloud.modules.bsactivity.service.BsactivityGoodsqcodeService;
import com.icloud.modules.bsactivity.service.BsactivityOrderService;
import com.icloud.modules.wx.entity.WxUser;
import com.icloud.thirdinterfaces.score.entity.LongConsumeEntity;
import com.icloud.thirdinterfaces.score.service.LongbiServiceImpl;
import com.icloud.thirdinterfaces.score.utils.LongCoinUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
public class BsactivityGoodsExchangeService {

    private final static Logger log = LoggerFactory.getLogger(BsactivityGoodsExchangeService.class);
    @Autowired
    private BsactivityGoodsqcodeService bsactivityGoodsqcodeService;
    @Autowired
    private BsactivityGoodsService bsactivityGoodsService;
    @Autowired
    private BsactivityOrderService bsactivityOrderService;
    @Autowired
    private DistributedLockUtil distributedLockUtil;
    @Autowired
    private LongbiServiceImpl longbiServiceImpl;
    @Autowired
    private LongCoinUtil longCoinUtil;

    /**
     * 1、生成订单
     * 2、冻结库存、增加销量
     * 3、核销二维码
     * 4、扣减龙币
     * 5、完善订单
     * @param goods
     */
    public void scanExchange(BsactivityGoods goods, BsactivityGoodsqcode qcodeBean, WxUser user,Long exchangeNum,Long supplierId){
        //生成订单
        BsactivityOrder order = createOrder(goods,qcodeBean,user,supplierId);
        DistributedLock lock = distributedLockUtil.getDistributedLock("zssp_createorder");
        try {
            if (lock.acquire()) {
                if(qcodeBean.getStatus().intValue()==1){
                    throw new BeanException("二维码已使用!");
                }

                updateGoodsStore(goods,exchangeNum); //冻结库存、增加销量
                verfiyGoodsQcode(qcodeBean,user.getId().longValue());//核销二维码
                String seq = comsueLongCoin(user,order.getTotalAmount().toString()); //扣减龙币
                order.setOrderStatus(1);//已支付
                order.setTransationid(seq);
                bsactivityOrderService.updateById(order);
            } else { // 获取锁失败
                //获取锁失败业务代码
                throw new BeanException("系统繁忙,请稍后再试");
            }
        } finally {
            if (lock != null) {
                lock.release();
            }
        }

    }

    /**
     * 创建订单
     * @param goods
     * @param qcodeBean
     * @param user
     * @return
     */
    public BsactivityOrder createOrder(BsactivityGoods goods, BsactivityGoodsqcode qcodeBean, WxUser user,Long supplierId){
        BsactivityOrder order = new BsactivityOrder();
        order.setCreateTime(new Date());
        order.setGoodid(goods.getId());//商品id
        order.setQcodeid(qcodeBean.getId());//专属商品二维码id
        order.setGoodName(goods.getName());
        order.setTotalAmount(goods.getMarketPrice());
        order.setOrderType(0);// 订单类型（0、扫码消费、1、）
        order.setOrderStatus(0);//订单状态 0：未支付，1：已支付  ，2已完成
        order.setShippingStatus(0);//发货状态 1：已发货 0：未发货
        order.setDeleteStatus(0);//删除状态 1：已删除 0：未删除

        order.setSupplierId(supplierId);
        order.setName(user.getNickname());
        order.setPhone(user.getPhone());
        order.setUserid(user.getId().longValue());
        order.setOpenid(user.getOpenid());
        String lastString = null;
        String lockey = "rankOrderNo_"+qcodeBean.getQcode();
        DistributedLock lock = distributedLockUtil.getDistributedLock(lockey);
        try {
            if (lock.acquire()) {
                //获取锁成功业务代码
                lastString = bsactivityOrderService.getLastOrderNo();
            } else { // 获取锁失败
                //获取锁失败业务代码
                throw new SendPrizeException("系统繁忙，请稍后再试");
            }
        } finally {
            if (lock != null) {
                lock.release();
            }
        }
        order.setOrderNo(OrderUtil.bulidOrderNo(lastString));
        order.setGoodimg(goods.getGoodimg());
        //保存订单
        bsactivityOrderService.save(order);
        return order;
    }

    /**
     * 冻结库存，产生销量
     * @param goods
     * @param exChangeNum
     */
    private void updateGoodsStore(BsactivityGoods goods,Long exChangeNum){
        int result = bsactivityGoodsService.updateGoodsStore(goods,exChangeNum);
        if(result==0){
            log.error("兑换时,更新商品库存失败");
            throw new BeanException("更新商品库存失败");
        }
    }

    /**
     * 核销二维码
     * @param qcode
     */
    private void verfiyGoodsQcode(BsactivityGoodsqcode qcode,Long userid){
        qcode.setStatus(1);//使用状态(0未使用，1已使用
        qcode.setUserid(userid);
        boolean result = bsactivityGoodsqcodeService.updateById(qcode);
        if(!result){
            log.error("兑换时,核销商品二维码识别");
            throw new BeanException("核销商品二维码识别");
        }
    }
    /**
     * 核销二维码
     * @param user
     * @param consumeamount
     */
    private String comsueLongCoin(WxUser user,String consumeamount){
        LongConsumeEntity entity = longCoinUtil.getComsueEntity(user.getOpenid(),consumeamount);
        JSONObject result = null;
        try {
            result = longbiServiceImpl.consume(entity.getRequestParamMap());
        } catch (Exception e) {
            e.printStackTrace();
        }
        if(result!=null && "000000".equals(result.getString("returncode"))){
            log.error("龙币消费成功=="+result.getString("consumeamount"));
            return entity.getSeq();
        }else{
            log.error("龙币消费失败=="+result.getString("returnmsg"));
            throw new BeanException(LongbiServiceImpl.getCodeMap().get(result.getString("returncode")));
        }
    }
}
