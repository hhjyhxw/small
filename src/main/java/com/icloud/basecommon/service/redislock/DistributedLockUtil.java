/**
 * @author
 * @version
 * 2018年3月1日 下午3:58:54
 */
package com.icloud.basecommon.service.redislock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

/**
 * 类名称: DistributedLockUtil
 * 类描述: 
 * 创建人: zhangdehai
 * 创建时间:2018年3月1日 下午3:58:54
 */
@Component
public class DistributedLockUtil{

	@Autowired
	private RedisTemplate<String, String> redisTemplate;
    /**
     * 获取分布式锁
     * 默认获取锁10s超时，锁过期时间60s
     * @time 2016年5月6日 下午1:30:46
     * @return
     */
    public DistributedLock getDistributedLock(String lockKey){
        lockKey = assembleKey(lockKey);
		JedisLock lock = new JedisLock(lockKey,redisTemplate);
        return lock;
    }

    /**
     * 正式环境、测试环境共用一个redis时，避免key相同造成影响
     * @param lockKey
     * @return
     */
    private static String assembleKey(String lockKey) {
        return String.format("lock_%s",lockKey  );
    }

    /**
     * 获取分布式锁
     * 默认获取锁10s超时，锁过期时间60s
     * @time 2016年5月6日 下午1:38:32
     * @param lockKey
     * @param timeoutMsecs 指定获取锁超时时间
     * @return
     */
    public static DistributedLock getDistributedLock(String lockKey, int timeoutMsecs){
        lockKey = assembleKey(lockKey);
        JedisLock lock = new JedisLock(lockKey,timeoutMsecs);
        return lock;
    }

    /**
     * 获取分布式锁
     * 默认获取锁10s超时，锁过期时间60s
     * @param lockKey 锁的key
     * @param timeoutMsecs 指定获取锁超时时间
     * @param expireMsecs 指定锁过期时间
     * @return
     */
    public static DistributedLock getDistributedLock(String lockKey, int timeoutMsecs, int expireMsecs){
        lockKey = assembleKey(lockKey);
        JedisLock lock = new JedisLock(lockKey,expireMsecs,timeoutMsecs);
        return lock;
    }

}
