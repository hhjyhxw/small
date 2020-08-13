/**
 * @author
 * @version
 * 2018年3月1日 下午3:30:03
 */
package com.icloud.basecommon.service.redislock;

/**
 * 类名称: DistributedLock
 * 类描述: 分布式锁接口 顶级接口
 * 创建人: zhangdehai
 * 创建时间:2018年3月1日 下午3:30:04
 */
public interface DistributedLock {

	 /**
     * 获取锁
     * @return
     * @throws InterruptedException
     */
    public boolean acquire();

    /**
     * 释放锁
     * @time 2016年5月6日 上午11:02:59
     */
    public void release();
}
