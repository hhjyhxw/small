package com.icloud.common;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import org.apache.commons.beanutils.BeanMap;
import org.springframework.beans.BeanUtils;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class MapEntryUtils {

    public static <T> T clone(Object source, Class<T> type) {
        try {
            if (source == null) {
                return null;
            }
            T target = type.newInstance();
            BeanUtils.copyProperties(source, target);
            return target;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static <T> T clone(Object source, Class<T> type, String... ignoreProperties) {
        try {
            if (source == null) {
                return null;
            }
            T target = type.newInstance();
            BeanUtils.copyProperties(source, target, ignoreProperties);
            return target;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 利用反射实现
     * @param map
     * @param beanClass
     * @return
     * @throws Exception
     */
    public static Object mapToObject(Map<String, Object> map, Class<?> beanClass) throws Exception {
        if (map == null) {
            return null;
        }

        Object obj = beanClass.newInstance();

        Field[] fields = obj.getClass().getDeclaredFields();
        for (Field field : fields) {
            int mod = field.getModifiers();
            if (Modifier.isStatic(mod) || Modifier.isFinal(mod)) {
                continue;
            }

            boolean accessFlag = field.isAccessible();
            field.setAccessible(true);// 允许通过反射访问该字段
            field.set(obj, map.get(field.getName()));
            field.setAccessible(accessFlag);
        }

        return obj;
    }

    /**
     * 利用反射实现
     * <li>空属性不转换
     * <li>超过10万条数据不建议使用
     * @param obj
     * @return
     * @throws Exception
     */
    public static Map<String, Object> objectToMap(Object obj) throws Exception {

        if (obj == null) {
            return null;
        }

        Map<String, Object> map = new HashMap<String, Object>();
        Field[] fields = obj.getClass().getDeclaredFields();
        for (int i = 0, len = fields.length; i < len; i++) {
            String varName = fields[i].getName();
            boolean accessFlag = fields[i].isAccessible();
            fields[i].setAccessible(true);// 允许通过反射访问该字段

            Object valueObj = fields[i].get(obj);
            if (valueObj != null) {
                map.put(varName, valueObj);
            }
            fields[i].setAccessible(accessFlag);
        }
        return map;
    }

    /**
     * 利用java.beans.Introspector实现
     * @param map
     * @param beanClass
     * @return
     * @throws Exception
     */
    public static Object mapToObject2(Map<String, Object> map, Class<?> beanClass) throws Exception {
        if (map == null)
            return null;

        Object obj = beanClass.newInstance();

        BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
        PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
        for (PropertyDescriptor property : propertyDescriptors) {
            Method setter = property.getWriteMethod();
            if (setter != null) {
                setter.invoke(obj, map.get(property.getName()));
            }
        }
        return obj;
    }

    /**
     * 利用java.beans.Introspector实现
     * @param obj
     * @return
     * @throws Exception
     */
    public static Map<String, Object> objectToMap2(Object obj) throws Exception {
        if(obj == null)
            return null;

        Map<String, Object> map = new HashMap<String, Object>();

        BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
        PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
        for (PropertyDescriptor property : propertyDescriptors) {
            String key = property.getName();
            if (key.compareToIgnoreCase("class") == 0) {
                continue;
            }
            Method getter = property.getReadMethod();
            Object value = getter!=null ? getter.invoke(obj) : null;
            map.put(key, value);
        }

        return map;
    }

    /**
     * 利用org.apache.commons.beanutils.BeanUtils实现
     * @param map
     * @param beanClass
     * @return
     * @throws Exception
     */
    public static Object mapToObject3(Map<String, Object> map, Class<?> beanClass) throws Exception {
        if (map == null)
            return null;

        Object obj = beanClass.newInstance();
        org.apache.commons.beanutils.BeanUtils.populate(obj, map);
        return obj;
    }

    /**
     * 利用org.apache.commons.beanutils.BeanMap实现
     * @param obj
     * @return
     */
    public static Map<?,?> objectToMap3(Object obj) {
        if(obj == null)
            return null;

        return new BeanMap(obj);
    }



    /**
     * 将Map对象通过反射机制转换成Bean对象
     *
     * @param mapResult 存放数据的map对象
     * @param clazz 待转换的class
     * @return 转换后的Bean对象
     * @throws Exception 异常
     */
    public static Object mapToBean(HashMap<String, Object> mapResult, Class<?> clazz) throws Exception {
        Object obj = clazz.newInstance();
        if(mapResult != null && mapResult.size() > 0) {
            for(Map.Entry<String, Object> entry : mapResult.entrySet()) {
                String propertyName = entry.getKey();       //属性名
                Object value = entry.getValue();
                if(value==null || "".equals(value.toString())){
                    continue;
                }
                String setMethodName = "set"
                        + propertyName.substring(0, 1).toUpperCase()
                        + propertyName.substring(1);
                Field field = getClassField(clazz, propertyName);
                if(field==null)
                    continue;
                Class<?> fieldTypeClass = field.getType();
                value = convertValType(value, fieldTypeClass);
                try{
                    clazz.getMethod(setMethodName, field.getType()).invoke(obj, value);
                }catch(NoSuchMethodException e){
                    e.printStackTrace();
                }
            }
        }
        return obj;
    }

    /**
     * 把map中 的值 转换 成 某个指定对象的 属性类型值
     * @param mapResult
     * @param clazz
     * @return
     * @throws Exception
     */
    public static Map<String, Object> mapvalueToBeanValue(Map<String, Object> mapResult, Class<?> clazz) throws Exception {
        Object obj = clazz.newInstance();
        if(mapResult != null && mapResult.size() > 0) {
            for(Map.Entry<String, Object> entry : mapResult.entrySet()) {
                String propertyName = entry.getKey();       //属性名
                Object value = entry.getValue();

                Field field = getClassField(clazz, propertyName);
                if(field==null)
                    continue;
                Class<?> fieldTypeClass = field.getType();
                value = convertValType(value, fieldTypeClass);
                mapResult.put(propertyName,value);
            }
        }
        return mapResult;
    }

    /**
     * 把map中 的值 转换 成 某个指定对象的 属性类型值
     * map中 对象 属性 转 数据库字段
     * @param mapResult
     * @param clazz
     * @return
     * @throws Exception
     */
    public static Map<String, Object> mapvalueToBeanValueAndBeanProperyToColum(Map<String, Object> mapResult, Class<?> clazz) throws Exception {
        Object obj = clazz.newInstance();
        Map<String, Object> columResult = new HashMap<String, Object>();
        if(mapResult != null && mapResult.size() > 0) {
            for(Map.Entry<String, Object> entry : mapResult.entrySet()) {
                String propertyName = entry.getKey();       //属性名
                Object value = entry.getValue();
                if("serialVersionUID".equals(propertyName)){
                    continue;
                }
                Field field = getClassField(clazz, propertyName);
                if(field==null)
                    continue;
                TableField myFieldAnnotation = field.getAnnotation(TableField.class);
                if(!myFieldAnnotation.exist()){//表示布关联数据库
                    continue;
                }
                String column = null;
                if(myFieldAnnotation!=null){
                    column = myFieldAnnotation.value();
                }else {
                    TableId idfieldAnnotation = field.getAnnotation(TableId.class);
                    column = idfieldAnnotation.value();
                }

                myFieldAnnotation.value();
                Class<?> fieldTypeClass = field.getType();
                value = convertValType(value, fieldTypeClass);
                if(column!=null && value!=null){
                    columResult.put(column,value);
                }
            }
        }
        return columResult;
    }

    /**
     * 将Object类型的值，转换成bean对象属性里对应的类型值
     *
     * @param value Object对象值
     * @param fieldTypeClass 属性的类型
     * @return 转换后的值
     */
    private static Object convertValType(Object value, Class<?> fieldTypeClass) {
        Object retVal = null;
        if(Long.class.getName().equals(fieldTypeClass.getName())
                || long.class.getName().equals(fieldTypeClass.getName())) {
            if(value!=null && !"".equals(value.toString().trim())){
                retVal = Long.parseLong(value.toString());
            }
        } else if(Integer.class.getName().equals(fieldTypeClass.getName())
                || int.class.getName().equals(fieldTypeClass.getName())) {
            if(value!=null && !"".equals(value.toString().trim())){
                retVal = Integer.parseInt(value.toString().trim());
            }
        } else if(Float.class.getName().equals(fieldTypeClass.getName())
                || float.class.getName().equals(fieldTypeClass.getName())) {
            if(value!=null && !"".equals(value.toString().trim())){
                retVal = Float.parseFloat(value.toString().trim());
            }
        } else if(Double.class.getName().equals(fieldTypeClass.getName())
                || double.class.getName().equals(fieldTypeClass.getName())) {
            if(value!=null && !"".equals(value.toString().trim())){
                retVal = Double.parseDouble(value.toString().trim());
            }
        } else {
            retVal = value;
        }
        return retVal;
    }

    /**
     * 获取指定字段名称查找在class中的对应的Field对象(包括查找父类)
     *
     * @param clazz 指定的class
     * @param fieldName 字段名称
     * @return Field对象
     */
    private static Field getClassField(Class<?> clazz, String fieldName) {
        if( Object.class.getName().equals(clazz.getName())) {
            return null;
        }
        Field []declaredFields = clazz.getDeclaredFields();
        for (Field field : declaredFields) {
            if (field.getName().equals(fieldName)) {
                return field;
            }
        }

        Class<?> superClass = clazz.getSuperclass();
        if(superClass != null) {// 简单的递归一下
            return getClassField(superClass, fieldName);
        }
        return null;
    }

    public static Map<String, Object> clearNullValue( Map<String, Object> map){
//        for (Map.Entry entry: map.entrySet()) {
//            if(entry.getKey()!=null && (entry.getValue()==null || "".equals(entry.getValue().toString().trim()))){
//                map.remove(entry.getKey());
//            }
//        }
        Iterator<Map.Entry<String, Object>> iter=map.entrySet().iterator();
        while (iter.hasNext()) {
            Map.Entry<String, Object> entry = iter.next();
//            System.out.println(entry.getKey()+"======="+entry.getValue());
            if(entry.getKey()!=null && (entry.getValue()==null || "".equals(entry.getValue().toString().trim()))){
                iter.remove();
            }
        }

        return map;
    }
}
