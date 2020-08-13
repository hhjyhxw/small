package com.icloud.modules.mpwx.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.common.AppContext;
import com.icloud.common.UrlDownLoadUtils;
import com.icloud.common.util.wx.FormUploadMultimediaUtil;
import com.icloud.modules.mpwx.dao.MpwxSucaiMapper;
import com.icloud.modules.mpwx.entity.MpwxSucai;
import com.icloud.modules.mpwx.vo.sucai.WebSucaiItemvo;
import com.icloud.modules.mpwx.vo.sucai.WebSucaivo;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import me.chanjar.weixin.mp.api.WxMpMaterialService;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.material.WxMpMaterial;
import me.chanjar.weixin.mp.bean.material.WxMpMaterialNews;
import me.chanjar.weixin.mp.bean.material.WxMpMaterialUploadResult;
import me.chanjar.weixin.mp.bean.material.WxMpNewsArticle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 */
@Service
@Transactional
@Slf4j
public class MpwxSucaiService extends BaseServiceImpl<MpwxSucaiMapper,MpwxSucai> {

    @Autowired
    private MpwxSucaiMapper mpwxSucaiMapper;
    @Autowired
    private FormUploadMultimediaUtil formUploadMultimediaUtil;
    @Autowired
    private WxMpService wxMpService;


    /**
     * 保存永久图片素材
     */
    public void saveOrUpdatePic(MpwxSucai mpwxSucai) throws WxErrorException {
        WxMpMaterialService wxMpMaterialService = wxMpService.getMaterialService();
        String tempbaseDir = AppContext.baseDirectory()+"/temp/";
        File filetempbaseDir = new File(tempbaseDir);
        if (!filetempbaseDir.exists()) {
            filetempbaseDir.mkdirs();
        }
        if(mpwxSucai.getId()==null){
            String uploadPath = mpwxSucai.getLocalUrls();
            File filepath = new File(tempbaseDir + "/" + UUID.randomUUID() + ".png");
            UrlDownLoadUtils.dowmloadUrlResoure(filepath, uploadPath);
            //图文消息改变后需要mediaid，mediaImgUpload接口上传获取不到 MediaId,所以改成永久接口
            WxMpMaterial wxMpMaterial = new WxMpMaterial(filepath.getName(), filepath, null, null);
            WxMpMaterialUploadResult wxMpMaterialUploadResult = wxMpMaterialService.materialFileUpload("image", wxMpMaterial);
            log.info("上传永久图片素材resutl:wxMpMaterialUploadResult==" + JSON.toJSONString(wxMpMaterialUploadResult));
            mpwxSucai.setWxUrls(wxMpMaterialUploadResult.getUrl());
            mpwxSucai.setWxMediaids(wxMpMaterialUploadResult.getMediaId());
            mpwxSucai.setCreateTime(new Date());
            mpwxSucai.setScType("4");//图片
            mpwxSucaiMapper.insert(mpwxSucai);
        }else{
            MpwxSucai oldMpwxSucai = mpwxSucaiMapper.selectById(mpwxSucai.getId());
            //本地图片不相等重新上传
            if(!oldMpwxSucai.getLocalUrls().equals(mpwxSucai.getLocalUrls())){
                String uploadPath = mpwxSucai.getLocalUrls();
                File filepath = new File(tempbaseDir + "/" + UUID.randomUUID() + ".png");
                UrlDownLoadUtils.dowmloadUrlResoure(filepath, uploadPath);
                WxMpMaterial wxMpMaterial = new WxMpMaterial(filepath.getName(), filepath, null, null);
                WxMpMaterialUploadResult wxMpMaterialUploadResult = wxMpMaterialService.materialFileUpload("image", wxMpMaterial);
                log.info("上传永久图片素材resutl:wxMpMaterialUploadResult==" + JSON.toJSONString(wxMpMaterialUploadResult));

                mpwxSucai.setWxUrls(wxMpMaterialUploadResult.getUrl());
                mpwxSucai.setWxMediaids(wxMpMaterialUploadResult.getMediaId());
                mpwxSucai.setModifyTime(new Date());
                mpwxSucai.setScType("4");//图片
                mpwxSucaiMapper.updateById(mpwxSucai);
                //删除原来的图片
                wxMpMaterialService.materialDelete(oldMpwxSucai.getWxMediaids());
            }else if(oldMpwxSucai.getLocalUrls().equals(mpwxSucai.getLocalUrls()) && !oldMpwxSucai.getTitle().equals(oldMpwxSucai.getTitle())){
                //只更新本地标题
                mpwxSucaiMapper.updateById(mpwxSucai);
            }

        }
    }

    /**
     * 保存或者更新图文素材
     * 添加：
     *      1、上传图文素材图片获取 thumb_media_id
     *      2、封装图文格式提交微信添加
     *      3、保存本地
     *  编辑：
     *      1、判断图片地址是否是新的
     *      2、是新的：删除原来的，上传新的
     *      3、封装图文格式、提交微信更新图文
     *      4、保存本地
     */
    public void saveOrupdateNews(WebSucaivo webSucaivo) throws WxErrorException {
        WxMpMaterialService wxMpMaterialService = wxMpService.getMaterialService();
        String tempbaseDir = AppContext.baseDirectory()+"/temp/";
        File filetempbaseDir = new File(tempbaseDir);
        if (!filetempbaseDir.exists()) {
            filetempbaseDir.mkdirs();
        }
        if(webSucaivo.getId()==null){
            List<WebSucaiItemvo> list = webSucaivo.getList();
           //1、上传图文的图片 获取 微信服务器上的url(thumb_media_id)
            list =  getNewWebSucaiItemvoList(list,tempbaseDir,wxMpMaterialService);
            //2、封装需要上传的图文消息
            WxMpMaterialNews wxMpMaterialNews = new WxMpMaterialNews();
            wxMpMaterialNews.setCreateTime(new Date());
            wxMpMaterialNews.setUpdateTime(wxMpMaterialNews.getCreateTime());
            wxMpMaterialNews.setArticles(getWxMpNewsArticleList(list));

            log.info("上传永久图文素材params:wxMpMaterialNews==" + JSON.toJSONString(wxMpMaterialNews));
            WxMpMaterialUploadResult wxMpMaterialUploadResult = wxMpMaterialService.materialNewsUpload(wxMpMaterialNews);
            log.info("上传永久图文素材resutl:wxMpMaterialUploadResult==" + JSON.toJSONString(wxMpMaterialUploadResult));
            //3、保存数据库
            MpwxSucai sucai = new MpwxSucai();
            sucai.setScType("1");
            sucai.setTitle(webSucaivo.getTitle());
            sucai.setWxMediaids(wxMpMaterialUploadResult.getMediaId());
            sucai.setDetailInfo(JSON.toJSONString(webSucaivo));
            sucai.setCreateTime(new Date());
            mpwxSucaiMapper.insert(sucai);
        }else{
            //保存数据库图文素材对象
            MpwxSucai old = mpwxSucaiMapper.selectById(webSucaivo.getId());
            //用于页面展示的图文素材对象
            WebSucaivo webSucaivoOld =  JSON.parseObject(old.getDetailInfo(),WebSucaivo.class);
            List<WebSucaiItemvo> listnew = webSucaivo.getList();
            List<WebSucaiItemvo> listOld = webSucaivoOld.getList();

            //判断是否需要更新图文（这里不更新，直接删除新添加）
            //1、上传图文的图片 获取 微信服务器上的url(thumb_media_id)
            listnew = getNewWebSucaiItemvoList(listnew,tempbaseDir,wxMpMaterialService);
            //2、封装需要上传的图文消息
            WxMpMaterialNews wxMpMaterialNews = new WxMpMaterialNews();
            wxMpMaterialNews.setCreateTime(new Date());
            wxMpMaterialNews.setUpdateTime(wxMpMaterialNews.getCreateTime());
            wxMpMaterialNews.setArticles(getWxMpNewsArticleList(listnew));
            log.info("上传永久图文素材params:wxMpMaterialNews==" + JSON.toJSONString(wxMpMaterialNews));
            WxMpMaterialUploadResult wxMpMaterialUploadResult = wxMpMaterialService.materialNewsUpload(wxMpMaterialNews);
            log.info("上传永久图文素材resutl:wxMpMaterialUploadResult==" + JSON.toJSONString(wxMpMaterialUploadResult));
            //3、保存数据库
            String oldMediaId = old.getWxMediaids();//用于删除之前的永久素材

            old.setTitle(webSucaivo.getTitle());
            old.setWxMediaids(wxMpMaterialUploadResult.getMediaId());
            old.setDetailInfo(JSON.toJSONString(webSucaivo));
            old.setModifyTime(new Date());
            mpwxSucaiMapper.updateById(old);

            //4、删除旧图文 及关联永久素材
            boolean deleteResult = wxMpMaterialService.materialDelete(oldMediaId);
            log.info("删除永久图文素材结果==="+deleteResult);
            for (WebSucaiItemvo itemvo:listOld) {
                boolean deletePicResult = wxMpMaterialService.materialDelete(itemvo.getThumbMediaId());
                log.info("删除永久图文素材中的图片结果==="+deletePicResult);
            }


        }

    }

    /**
     * 封装整个图文 article
     * @param list
     * @return
     */
    private List<WxMpNewsArticle> getWxMpNewsArticleList(List<WebSucaiItemvo> list){
        List<WxMpNewsArticle> articles = new ArrayList<WxMpNewsArticle>();
        WxMpNewsArticle wxMpNewsArticle = null;
        for (int i=0;i<list.size();i++){
            WebSucaiItemvo itemvo = list.get(i);
            wxMpNewsArticle = new WxMpNewsArticle();
            wxMpNewsArticle.setThumbMediaId(itemvo.getThumbMediaId());
            wxMpNewsArticle.setTitle(itemvo.getSubTitle());
            wxMpNewsArticle.setContentSourceUrl(itemvo.getWxUrls());
            wxMpNewsArticle.setContent(itemvo.getMainContent());
            wxMpNewsArticle.setShowCoverPic(true);
            wxMpNewsArticle.setUrl(itemvo.getWxUrls());
            wxMpNewsArticle.setNeedOpenComment(true);
            wxMpNewsArticle.setOnlyFansCanComment(true);
            articles.add(wxMpNewsArticle);
        }
        return articles;
    }

    /**
     * 封装单个图文子项
     * @param itemvo
     * @return
     */
    private WxMpNewsArticle getWxMpNewsArticle(WebSucaiItemvo itemvo){
            WxMpNewsArticle wxMpNewsArticle = new WxMpNewsArticle();
            wxMpNewsArticle.setThumbMediaId(itemvo.getThumbMediaId());
            wxMpNewsArticle.setTitle(itemvo.getSubTitle());
            wxMpNewsArticle.setContentSourceUrl(itemvo.getWxUrls());
            wxMpNewsArticle.setContent(itemvo.getMainContent());
            wxMpNewsArticle.setShowCoverPic(true);
            wxMpNewsArticle.setUrl(itemvo.getWxUrls());
            wxMpNewsArticle.setNeedOpenComment(true);
            wxMpNewsArticle.setOnlyFansCanComment(true);
        return wxMpNewsArticle;
    }

    /**
     * 上传图片永久素材
     * @param list
     * @return
     */
    private  List<WebSucaiItemvo> getNewWebSucaiItemvoList(List<WebSucaiItemvo> list,String tempbaseDir,WxMpMaterialService wxMpMaterialService) throws WxErrorException {
        //1、上传图文的图片 获取 微信服务器上的url(thumb_media_id)
        for (int i = 0; i < list.size(); i++) {
            WebSucaiItemvo itemvo = list.get(i);
            JSONObject jsonresut = null;
            //上传本地图片到微信
            String uploadPath = itemvo.getLocalUrls();
            File filepath = new File(tempbaseDir + "/" + UUID.randomUUID() + ".png");
            UrlDownLoadUtils.dowmloadUrlResoure(filepath, uploadPath);
            //图文消息改变后需要mediaid，mediaImgUpload接口上传获取不到 MediaId,所以改成永久接口
            WxMpMaterial wxMpMaterial = new WxMpMaterial(filepath.getName(), filepath, null, null);
            WxMpMaterialUploadResult wxMpMaterialUploadResult = wxMpMaterialService.materialFileUpload("image", wxMpMaterial);
            log.info("上传永久图片素材resutl:wxMpMaterialUploadResult==" + JSON.toJSONString(wxMpMaterialUploadResult));
            itemvo.setWxPicUrls(wxMpMaterialUploadResult.getUrl());
            itemvo.setThumbMediaId(wxMpMaterialUploadResult.getMediaId());
            list.set(i, itemvo);
        }
        return list;
    }
}

