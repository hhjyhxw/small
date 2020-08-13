package com.icloud.config.starttask;

import com.alibaba.fastjson.JSON;
import com.icloud.config.redis.RedisUtils;
import com.icloud.modules.sys.entity.SysMenuEntity;
import com.icloud.modules.sys.service.SysMenuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ApplicationRunnerImpl implements ApplicationRunner {
    protected Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private SysMenuService sysMenuService;
    @Autowired
    private RedisUtils redisUtils;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<SysMenuEntity> menuList = sysMenuService.list();
        for(SysMenuEntity sysMenuEntity : menuList){
            SysMenuEntity parentMenuEntity = sysMenuService.getById(sysMenuEntity.getParentId());
            if(parentMenuEntity != null){
                sysMenuEntity.setParentName(parentMenuEntity.getName());
            }
        }
        redisUtils.set("allmenu",menuList);
        logger.info("加载所有菜单存入缓存===:"+JSON.toJSONString(menuList));

    }
}