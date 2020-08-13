package com.icloud.modules.mpwx.service;

import com.icloud.modules.mpwx.entity.MpwxReplyKeyword;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.mpwx.dao.MpwxReplyKeywordMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 一条回复对应一个或者多个关键字
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-27 10:23:43
 */
@Service
@Transactional
public class MpwxReplyKeywordService extends BaseServiceImpl<MpwxReplyKeywordMapper,MpwxReplyKeyword> {

    @Autowired
    private MpwxReplyKeywordMapper mpwxReplyKeywordMapper;
}

