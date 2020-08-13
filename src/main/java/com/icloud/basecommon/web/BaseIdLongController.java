//package com.icloud.basecommon.web;
//import com.github.pagehelper.PageInfo;
//import com.icloud.annotation.SysLog;
//import com.icloud.basecommon.model.Query;
//import com.icloud.basecommon.service.MybaseServiceImpl;
//import com.icloud.common.msg.BaseResponse;
//import com.icloud.common.msg.TableResultResponse;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Map;
//
//public abstract class BaseIdLongController<B extends MybaseServiceImpl,T>{
//
//	public final Logger log = LoggerFactory.getLogger(this.getClass());
//    @Autowired
//    protected HttpServletRequest request;
//    @Autowired
//    protected HttpServletResponse response;
//    @Autowired
//    protected B baseService;
//
//	/**
//	 * 列表页面
//	 * @return
//	 */
//    @SysLog("查询列表")
//    @RequestMapping(value = "/list")
//	public abstract String list(T t, @RequestParam Map<String,Object> params) ;
//    /**
//     * 分页获取
//     * @return
//     * @throws IOException
//     */
//    @SysLog("异步查询")
//    @RequestMapping(value = "/getList")
//    @ResponseBody
//	public  TableResultResponse getList(T t, @RequestParam Map<String,Object> params){
//
//        Query query = new Query(params);
//        PageInfo<T> page = baseService.findByPage(query.getPageNum(),query.getPageSize(), query);
//        TableResultResponse result = new TableResultResponse(page.getTotal(),page.getList(),page.getPages());
//        return result;
//    }
//    /**
//     * *跳转新增或者编辑页面
//     * @param id
//     * @return
//     */
//    @SysLog("跳转更新页面")
//    @RequestMapping(value = "/toinput")
//	public abstract String toinput(Long id);
//
//	/**
//	 *新增
//	 * @return
//	 */
//    @SysLog("添加")
//    @RequestMapping(value = "/add")
//    @ResponseBody
//	public  BaseResponse add(T t){
//	    try {
//            boolean result = baseService.save(t);
//            if(result)
//                return new BaseResponse(200,"0000","保存成功");
//            else
//                return new BaseResponse(200,"1000","保存失败");
//        }catch (Exception e){
//	        e.printStackTrace();
//            return new BaseResponse(200,"2000","系统异常");
//        }
//    }
//
//    /**
//     *更新
//     * @return
//     */
//    @SysLog("更新")
//    @RequestMapping(value = "/update")
//    @ResponseBody
//    public  BaseResponse update(T t){
//        try {
//            boolean result = baseService.updateById(t);
//            if(result)
//                return new BaseResponse(200,"0000","更新成功");
//            else
//                return new BaseResponse(200,"1000","更新失败");
//        }catch (Exception e){
//            e.printStackTrace();
//            return new BaseResponse(200,"2000","系统异常");
//        }
//    }
//
//	/**
//	 * 删除
//	 * @param id
//	 * @return
//	 * @throws Exception
//	 */
//    @SysLog("删除")
//    @RequestMapping(value = "/del")
//    @ResponseBody
//	public  BaseResponse del(@RequestParam  Long id){
//        try {
//            boolean result = baseService.removeById(id);
//            if(result)
//                return new BaseResponse(200,"0000","删除成功");
//            else
//                return new BaseResponse(200,"1000","删除失败");
//        }catch (Exception e){
//            e.printStackTrace();
//            return new BaseResponse(200,"2000","系统异常");
//        }
//    }
//}
