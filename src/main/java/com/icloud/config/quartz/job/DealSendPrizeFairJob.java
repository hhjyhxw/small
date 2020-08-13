/**
 * @author
 * @version
 * 2018年7月24日 下午4:45:16
 */
package com.icloud.config.quartz.job;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 类名称: DealSendPrizeFairJob
 * 类描述: 处理用户过期数据
 * 创建人: zhangdehai
 * 创建时间:2018年7月24日 下午4:45:16
 */
@Component
@EnableScheduling
public class DealSendPrizeFairJob {

	public final static Logger log = LoggerFactory.getLogger(DealSendPrizeFairJob.class);
	
//	@Autowired
//	private DealUserValidMoneyService dealUserValidMoneyService;

//	秒（0~59）
//	分钟（0~59）
//	小时（0~23）
//	天（月）（0~31，但是你需要考虑你月的天数）
//	月（0~11）
//	天（星期）（1~7 1=SUN 或 SUN，MON，TUE，WED，THU，FRI，SAT）
//	年份（1970－2099）


    //每1分钟运行一次（秒 分 时 ）
//    @Scheduled(cron = "0 0/1 * * * ?")
	//每天9点运行
//	@Scheduled(cron = "0 0 9  * * ? ")
	//每20分钟运行一次（秒 分 时 ）
	@Scheduled(cron = "0 0/10 * * * ?")
	//每5妙运行一次
//	@Scheduled(cron = "0/5 * * * * ?")
	public void todDalSendPrizeFairJob() throws Exception{
		log.info("===============todDalSendPrizeFairJob running===============");
//        dealUserValidMoneyService.dealWithUserValidMoney(false);
		log.info("===============todDalSendPrizeFairJob end ===============");
	}

}
