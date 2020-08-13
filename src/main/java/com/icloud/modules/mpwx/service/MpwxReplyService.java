package com.icloud.modules.mpwx.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.mpwx.dao.MpwxReplyMapper;
import com.icloud.modules.mpwx.entity.MpwxReply;
import com.icloud.modules.mpwx.entity.MpwxReplyKeyword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:52:13
 */
@Service
@Transactional
public class MpwxReplyService extends BaseServiceImpl<MpwxReplyMapper,MpwxReply> {

    @Autowired
    private MpwxReplyMapper mpwxReplyMapper;
    @Autowired
    private MpwxReplyKeywordService mpwxReplyKeywordService;

    /**
     * 保存或者更新回复与 关联的关键字
     * @param mpwxReply
     */
    public void saveOrUpdateReply(MpwxReply mpwxReply) {
        List<MpwxReplyKeyword> keywordList = mpwxReply.getKeywordList();
        if(mpwxReply.getId()==null){
            mpwxReply.setCreateTime(new Date());
            mpwxReplyMapper.insert(mpwxReply);
            for (MpwxReplyKeyword keyword:keywordList){
                keyword.setReplyId(mpwxReply.getId());
                mpwxReplyKeywordService.save(keyword);
            }
        }else{
            List<MpwxReplyKeyword> oldkeywordList = mpwxReplyKeywordService.list(new QueryWrapper<MpwxReplyKeyword>().eq("reply_id",mpwxReply.getId()));
            //更新回复记录
            mpwxReply.setModifyTime(new Date());
            mpwxReplyMapper.updateById(mpwxReply);
            //默认回复没有关键字
            if(!"0".equals(mpwxReply.getKeywords())){
                    //更新对应的关键字记录
                    for (int i=0;i<oldkeywordList.size();i++){
                        MpwxReplyKeyword oldkeyword = oldkeywordList.get(i);
                        //判断新集合中元素是否在旧集合，存在则更新，不存在则删除旧集合对象
                        int newkeywodIndex = keywordList.indexOf(oldkeyword);
                        if(newkeywodIndex>=0){
                            MpwxReplyKeyword newkeywod = keywordList.get(newkeywodIndex);
                            //更新旧的关键字，更新后在新集合中删除
                            mpwxReplyKeywordService.updateById(newkeywod);
                            keywordList.remove(newkeywod);
                        }else{
                            //删除旧集合
                            mpwxReplyKeywordService.removeById(oldkeyword);
                        }
                    }
                    //保存新加入的关键字
                    if(keywordList.size()>0){
                        for (MpwxReplyKeyword keyword:keywordList){
                            keyword.setReplyId(mpwxReply.getId());
                            mpwxReplyKeywordService.save(keyword);
                        }
                    }
            }

        }
    }


    /**
     * 批量保存
     * @param list
     */
    public void saveOrUpdateReplList(List<MpwxReply> list) {
        if(list!=null && list.size()>0){
            for (MpwxReply reply:list){
                saveOrUpdateReply(reply);
            }
        }

    }
}

