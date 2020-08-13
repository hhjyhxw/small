package com.icloud.modules.job.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.icloud.common.PageUtils;
import com.icloud.common.Query;
import com.icloud.modules.job.dao.ScheduleJobLogDao;
import com.icloud.modules.job.entity.ScheduleJobLogEntity;
import com.icloud.modules.job.service.ScheduleJobLogService;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

//@Service("scheduleJobLogService")
@Service("scheduleJobLogService")
public class ScheduleJobLogServiceImpl extends ServiceImpl<ScheduleJobLogDao, ScheduleJobLogEntity> implements ScheduleJobLogService {

	@Override
	public PageUtils queryPage(Map<String, Object> params) {
		String jobId = (String)params.get("jobId");

		IPage<ScheduleJobLogEntity> page = this.page(
			new Query<ScheduleJobLogEntity>().getPage(params),
			new QueryWrapper<ScheduleJobLogEntity>().like(StringUtils.isNotBlank(jobId),"job_id", jobId)
		);

		return new PageUtils(page);
	}

}
