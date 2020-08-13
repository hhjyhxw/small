package com.icloud.common;

import org.apache.commons.lang3.StringUtils;

import java.io.File;

public class AppContext {
    public static String baseDirectory() {
        try {
            String path = ClassLoader.getSystemResource("").getPath();
            if (StringUtils.isBlank(path))
                return getProjectPath();
            return path;
        } catch (Exception ignored) {
        }
        return getProjectPath();
    }

    private static String getProjectPath() {
        java.net.URL url = AppContext.class.getProtectionDomain().getCodeSource()
                .getLocation();
        String filePath = null;
        try {
            filePath = java.net.URLDecoder.decode(url.getPath(), "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (filePath.endsWith(".jar"))
            filePath = filePath.substring(0, filePath.lastIndexOf(File.separatorChar) + 1);
        java.io.File file = new java.io.File(filePath);
        filePath = file.getAbsolutePath();
        return filePath;
    }
}