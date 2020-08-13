package com.icloud;//package com.icloud;

import com.icloud.basecommon.util.codec.Md5Utils;
import com.icloud.common.util.RandomUtil;
import com.icloud.modules.retail.entity.TRetailConfirn;
import com.icloud.modules.retail.service.TRetailConfirnService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;


@RunWith(SpringRunner.class)
@SpringBootTest(classes=Application.class)
public class CreateUserPassTest {

//
//	@Value("${local.server.port}")
//	private int port;
//

    @Autowired
    private TRetailConfirnService retailConfirnService;
	@Test
	@Transactional
	@Rollback(false)// 事务自动回滚，默认是true。可以不写
	public void test() {
        TRetailConfirn retail = null;
        Date date = new Date();
	    for(int i=0;i<10;i++){
            retail= new TRetailConfirn();
            retail.setCreateTime(date);
//            retail.setUserName(String.valueOf(new Date().getTime()-1300000000000l));
            retail.setUserName(String.valueOf(new Date().getTime()-1200000000000l));
            retail.setLiences(RandomUtil.getRandomString(6));
            retail.setPasswd(Md5Utils.md5(retail.getLiences()));
            retailConfirnService.save(retail);
        }
	}



}



