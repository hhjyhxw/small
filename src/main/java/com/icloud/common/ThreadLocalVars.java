package com.icloud.common;

import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashMap;


/**
 * 和当前Thread相关的
 */
public class ThreadLocalVars {
	private static ThreadLocal<HashMap<String,Object>> local=
			new ThreadLocal<HashMap<String,Object>>(); //用 HashMap不保证线程安全
	
	/**
	 * 存放数据
	 * @param key
	 * @param value
	 */
	public static void put(String key,Object value){
		HashMap<String,Object> m=null;
		m=local.get();
		if(m==null){
			 m=new HashMap<String,Object>();
			 local.set(m);
		}
		if(key!=null && value!=null){
			m.put(key.toLowerCase(), value);
		} 
	}
	
	
	/**
	 * 将 map设置到本地
	 * @param map
	 */
	public static void set(HashMap<String,Object> map){
		local.set(map); 
	}
	
	/**
	 * 获取所有数据
	 * @return
	 */
	public static HashMap<String,Object> get(){
		HashMap<String,Object> m=null;
		m=local.get(); 
		return m;
	}
	
	/**
	 * 获取数据
	 * @param key 
	 * @return
	 */
	public static Object get(String key){
		HashMap<String,Object> m=null;
		m=local.get();
		if(m!=null && key!=null){
			return m.get(key.toLowerCase());
		}
		return null;
	}
	
	/**
	 * 清除数据
	 */
	public static void clear(){
		local.remove();
	}
	
	
	public static String toString(Object obj){
		if(obj==null){
			return "null";
		}
		StringBuilder sb=new StringBuilder();
		 Field[] fields=obj.getClass().getDeclaredFields();    
		 Field f;
		 AccessibleObject.setAccessible(fields, true);  
		 sb.append(obj.getClass().getSimpleName());
		 sb.append(":");
		 for(int i=0;i<fields.length;i++){
			 f=fields[i];
			 
			 if(Modifier.isStatic(f.getModifiers())){
				 continue;
			 } 
			 sb.append(f.getName());
			 sb.append("="); 
			 try{
				 sb.append(f.get(obj));
			 }catch(Exception e){}  
			 sb.append(";"); 
		 }
		return sb.toString();
	}
	
	public static long getEnterpriseId(){
		long id=0;
		Object v=get(LogVars.ENTERPRISE_ID);
		if(v!=null){
			try{
				id=Long.parseLong(String.valueOf(v));
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		return id;
	}
	
	public static long getEmployeeId(){
		long id=0;
		Object v=get(LogVars.USER_ID);
		if(v!=null){
			try{
				id=Long.parseLong(String.valueOf(v));
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		return id;
	}
	
	public static String getUserAccount(){ 
		Object v=get(LogVars.USER_ACCOUNT);
		if(v!=null){
			return String.valueOf(v);
		}
		return "";
	}
	 
	
}
