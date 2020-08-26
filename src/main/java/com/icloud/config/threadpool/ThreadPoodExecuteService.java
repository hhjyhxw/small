package com.icloud.config.threadpool;

import org.springframework.core.task.TaskExecutor;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @filename      : ThreadPoodDealPaySucessService.java
 * @description   : 支付成功,后续处理线程池
 * @author        : zdh
 * @create        : 2017年9月28日 上午11:50:37   
 * @copyright     : zhumeng.com@hyzy-activities
 *
 * Modification History:
 * Date             Author       Version
 * --------------------------------------
 */
public class ThreadPoodExecuteService {

	/**
	 *  corePoolSize：核心池的大小，这个参数跟后面讲述的线程池的实现原理有非常大的关系。在创建了线程池后，默认情况下，线程池中并没有任何线程，而是等待有任务到来才创建线程去执行任务，除非调用了prestartAllCoreThreads()或者prestartCoreThread()方法，从这2个方法的名字就可以看出，是预创建线程的意思，即在没有任务到来之前就创建corePoolSize个线程或者一个线程。默认情况下，在创建了线程池后，线程池中的线程数为0，当有任务来之后，就会创建一个线程去执行任务，当线程池中的线程数目达到corePoolSize后，就会把到达的任务放到缓存队列当中；
		maximumPoolSize：线程池最大线程数，这个参数也是一个非常重要的参数，它表示在线程池中最多能创建多少个线程；
		keepAliveTime：表示线程没有任务执行时最多保持多久时间会终止。默认情况下，只有当线程池中的线程数大于corePoolSize时，keepAliveTime才会起作用，直到线程池中的线程数不大于corePoolSize，即当线程池中的线程数大于corePoolSize时，如果一个线程空闲的时间达到keepAliveTime，则会终止，直到线程池中的线程数不超过corePoolSize。但是如果调用了allowCoreThreadTimeOut(boolean)方法，在线程池中的线程数不大于corePoolSize时，keepAliveTime参数也会起作用，直到线程池中的线程数为0；
		unit：参数keepAliveTime的时间单位，有7种取值，在TimeUnit类中有7种静态属性：	
		TimeUnit.DAYS;               //天
		TimeUnit.HOURS;             //小时
		TimeUnit.MINUTES;           //分钟
		TimeUnit.SECONDS;           //秒
		TimeUnit.MILLISECONDS;      //毫秒
		TimeUnit.MICROSECONDS;      //微妙
		TimeUnit.NANOSECONDS;       //纳秒
	 */
//	public static ThreadPoolExecutor executor = new ThreadPoolExecutor(5, 10, 200, TimeUnit.MILLISECONDS,new ArrayBlockingQueue<Runnable>(5));
     
	/**
	 * 任务执行器
	 */
	private static TaskExecutor taskExecutor = new TaskExecutor() {
		ExecutorService exeserv = Executors.newCachedThreadPool();
//		ExecutorService exeserv = new ThreadPoolExecutor(0,100,
//                                      60L, TimeUnit.SECONDS,
//                                      new SynchronousQueue<Runnable>());

		public void execute(Runnable task) {
			exeserv.execute(task);
		}
//		public Future<?> sumit(Callable task){
//			return exeserv.submit(task);
//		}
	};

	public static TaskExecutor getTaskExecutor() {
		return taskExecutor;
	}
}
