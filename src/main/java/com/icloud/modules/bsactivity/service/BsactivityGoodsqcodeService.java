package com.icloud.modules.bsactivity.service;

import cn.hutool.core.lang.UUID;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.basecommon.util.codec.AesUtils;
import com.icloud.common.MapEntryUtils;
import com.icloud.common.PageUtils;
import com.icloud.common.util.AppQRCodeUtil;
import com.icloud.exceptions.BeanException;
import com.icloud.modules.bsactivity.dao.BsactivityGoodsqcodeMapper;
import com.icloud.modules.bsactivity.entity.BsactivityGoods;
import com.icloud.modules.bsactivity.entity.BsactivityGoodsqcode;
import com.icloud.modules.bsactivity.vo.BsactivityGoodsqcodeProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-17 15:14:25
 */
@Service
@Transactional
public class BsactivityGoodsqcodeService extends BaseServiceImpl<BsactivityGoodsqcodeMapper,BsactivityGoodsqcode> {

    @Autowired
    private BsactivityGoodsqcodeProperties bsactivityGoodsqcodeProperties;
    @Autowired
    private BsactivityGoodsqcodeMapper bsactivityGoodsqcodeMapper;

    @Override
    public PageUtils<BsactivityGoodsqcode> findByPage(int pageNo, int pageSize, Map<String, Object> query) {
        PageHelper.startPage(pageNo, pageSize);
        List<BsactivityGoodsqcode> list = bsactivityGoodsqcodeMapper.queryMixList(MapEntryUtils.clearNullValue(query));
        PageInfo<BsactivityGoodsqcode> pageInfo = new PageInfo<BsactivityGoodsqcode>(list);
        PageUtils<BsactivityGoodsqcode> page = new PageUtils<BsactivityGoodsqcode>(list,(int)pageInfo.getTotal(),pageSize,pageNo);
        return page;
    }


    /**
     * 创建并保存
     * @param goods
     * @param relativePath
     * @param absolutPath
     */
    public void createAndsave(BsactivityGoods goods,String relativePath,String absolutPath){
        BsactivityGoodsqcode qcode = createQcode(goods,relativePath,absolutPath);
        super.save(qcode);
    }


    /**
     * 生成二维码 保存，并返回二维码对象
     * @param goods
     * @param relativePath
     * @param absolutPath
     * @return
     */
    public BsactivityGoodsqcode createQcode(BsactivityGoods goods,String relativePath,String absolutPath){
        BsactivityGoodsqcode qcode = new BsactivityGoodsqcode();
        //商品id
        qcode.setGoodsid(goods.getId());
        //生成状态
        qcode.setStatus(0);
        //创建时间
        qcode.setCreateTime(new Date());
        //二维码串
        String qcodeStr = UUID.randomUUID().toString();
        qcode.setQcode(qcodeStr);//二维码串
        //下载路径
        qcode.setImgpath(relativePath);
        //加密后的二维码串，用于用户微信扫码后再解码查询
       String encodeqcode = AesUtils.encode(qcodeStr,bsactivityGoodsqcodeProperties.getAsekey());
       //二维码内容：用户扫码后后跳转地址
       String text = bsactivityGoodsqcodeProperties.getText().replace("QCODE",encodeqcode);
        try {
            AppQRCodeUtil.generateQRCodeImage2(text,bsactivityGoodsqcodeProperties.getWidth(),bsactivityGoodsqcodeProperties.getHeight(),absolutPath);
        } catch (Exception e) {
            e.printStackTrace();
             throw new BeanException("生成专属商品二维码失败");
        }
        return qcode;
    }

    /**
     * 生成二维码 保存，并返回二维码对象
     * @param goods
     * @param relativePath
     * @param absolutPath
     * @return
     */
    public List<BsactivityGoodsqcode> createQcodeList(BsactivityGoods goods, String relativePath, String absolutPath){
        List<BsactivityGoodsqcode> list =new ArrayList<>();
        BsactivityGoodsqcode qcode = null;
       if(goods.getGernerNum()>0 && goods.getGernerNum()<=1000){
           for(int i=0;i<goods.getGernerNum();i++){
               qcode = new BsactivityGoodsqcode();
               //商品id
               qcode.setGoodsid(goods.getId());
               //生成状态
               qcode.setStatus(0);
               //创建时间
               qcode.setCreateTime(new Date());
               //二维码串
               String qcodeStr = UUID.randomUUID().toString();
               qcode.setQcode(qcodeStr);//二维码串

               //下载路径
               qcode.setImgpath(relativePath+"/"+goods.getId()+"/"+qcodeStr+".png");
               //加密后的二维码串，用于用户微信扫码后再解码查询
               String encodeqcode = AesUtils.encode(qcodeStr,bsactivityGoodsqcodeProperties.getAsekey());
               qcode.setSignqcode(encodeqcode);
               //二维码内容：用户扫码后后跳转地址
               String text = bsactivityGoodsqcodeProperties.getText().replace("QCODE",qcodeStr.toUpperCase());
               try {
                   AppQRCodeUtil.generateQRCodeImage2(text,bsactivityGoodsqcodeProperties.getWidth(),bsactivityGoodsqcodeProperties.getHeight(),absolutPath+"/"+qcodeStr+".png");
               } catch (Exception e) {
                   e.printStackTrace();
                   throw new BeanException("生成专属商品二维码失败");
               }
               list.add(qcode);
           }

       }
        return list;
    }
}

