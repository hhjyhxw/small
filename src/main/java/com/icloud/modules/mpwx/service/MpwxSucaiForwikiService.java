package com.icloud.modules.mpwx.service;

import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.mpwx.dao.MpwxSucaiMapper;
import com.icloud.modules.mpwx.entity.MpwxSucai;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 */
@Service
@Transactional
@Slf4j
public class MpwxSucaiForwikiService extends BaseServiceImpl<MpwxSucaiMapper,MpwxSucai> {

    @Autowired
    private MpwxSucaiMapper mpwxSucaiMapper;

}

