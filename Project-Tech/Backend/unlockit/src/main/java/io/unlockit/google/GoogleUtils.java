package io.unlockit.google;

import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class GoogleUtils {

    private static final String TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=";

    private static boolean isTokenValid(String accessToken) {
        String url = TOKEN_INFO_URL + accessToken;
        boolean isValid = false;
        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                isValid = true;
                // Uncomment to view token details
                /*
                try (InputStream inputStream = connection.getInputStream();
                     Scanner scanner = new Scanner(inputStream)) {

                    String response = scanner.useDelimiter("\\A").next();
                    System.out.println("response: " + response);
                }
                 */
            }
        }
        catch (IOException e) {
            System.out.println("Failed to connect to " + TOKEN_INFO_URL);
        }
        return isValid;
    }

    private static String extractAccessToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    public static boolean isRequestAuthorized(String authorizationHeader) {
        String accessToken = extractAccessToken(authorizationHeader);
        if (accessToken == null) {
            return false;
        }
        //System.out.println("Access Token: " + accessToken);
        if (!isTokenValid(accessToken)) {
            return false;
        }
        return true;
    }

    public static List<String> getUserInfo(String authorizationHeader) {
        String accessToken = extractAccessToken(authorizationHeader);
        return getUserInfoList(accessToken);
    }

    public static String getUserLoginExpireTime(String authorizationHeader) {
        String accessToken = extractAccessToken(authorizationHeader);
        return getLoginExpireTime(accessToken);
    }

    private static String getLoginExpireTime(String accessToken) {
        String url = TOKEN_INFO_URL + accessToken;
        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                try (InputStream inputStream = connection.getInputStream();
                     Scanner scanner = new Scanner(inputStream)) {

                    String response = scanner.useDelimiter("\\A").next();
                    //System.out.println("response: " + response);

                    // Parse the response to extract userId and userEmail
                    JSONObject jsonObject = new JSONObject(response);
                    String expireTime = String.valueOf(jsonObject.get("expires_in"));
                    return expireTime;
                }
            }
        }
        catch (IOException e) {
            System.out.println("Failed to connect to " + TOKEN_INFO_URL);
        }
        return null;
    }

    private static List<String> getUserInfoList(String accessToken) {
        String url = TOKEN_INFO_URL + accessToken;
        List<String> userInfo = new ArrayList<>();
        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                try (InputStream inputStream = connection.getInputStream();
                     Scanner scanner = new Scanner(inputStream)) {

                    String response = scanner.useDelimiter("\\A").next();
                    //System.out.println("response: " + response);

                    // Parse the response to extract userId and userEmail
                    JSONObject jsonObject = new JSONObject(response);
                    String userId = jsonObject.getString("user_id");
                    String userEmail = jsonObject.getString("email");

                    userInfo.add(userId);
                    userInfo.add(userEmail);
                    return userInfo;
                }
            }
        }
        catch (IOException e) {
            System.out.println("Failed to connect to " + TOKEN_INFO_URL);
        }
        return null;
    }
}
