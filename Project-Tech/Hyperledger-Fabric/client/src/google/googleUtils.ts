import { get } from 'https';

class GoogleUtils {
    private static readonly TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=";

    private static isTokenValid(accessToken: string): Promise<boolean> {
        const url = GoogleUtils.TOKEN_INFO_URL + accessToken;

        return new Promise<boolean>((resolve, reject) => {
            get(url, (response) => {
                if (response.statusCode === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).on('error', (error) => {
                console.error("Failed to connect to " + GoogleUtils.TOKEN_INFO_URL);
                reject(error);
            });
        });
    }

    private static extractAccessToken(authorizationHeader: string | undefined): string | null {
        if (authorizationHeader !== null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    public static async isRequestAuthorized(authorizationHeader: string | undefined): Promise<boolean> {
        const accessToken = GoogleUtils.extractAccessToken(authorizationHeader);
        if (!accessToken) {
            return false;
        }

        try {
            const isValid = await GoogleUtils.isTokenValid(accessToken);
            return isValid;
        } catch (error) {
            return false;
        }
    }

    public static async getUserInfo(authorizationHeader: string | undefined): Promise<string[] | null> {
        const accessToken = GoogleUtils.extractAccessToken(authorizationHeader);
        if (!accessToken) {
            return null;
        }

        return GoogleUtils.getUserInfoList(accessToken);
    }

    public static async getUserLoginExpireTime(authorizationHeader: string | undefined): Promise<string | null> {
        const accessToken = GoogleUtils.extractAccessToken(authorizationHeader);
        if (!accessToken) {
            return null;
        }

        return GoogleUtils.getLoginExpireTime(accessToken);
    }

    private static async getLoginExpireTime(accessToken: string): Promise<string | null> {
        const url = GoogleUtils.TOKEN_INFO_URL + accessToken;

        try {
            const response = await new Promise<string>((resolve, reject) => {
                get(url, (response) => {
                    let data = '';
                    response.on('data', (chunk) => {
                        data += chunk;
                    });

                    response.on('end', () => {
                        resolve(data);
                    });
                }).on('error', (error) => {
                    console.error("Failed to connect to " + GoogleUtils.TOKEN_INFO_URL);
                    reject(error);
                });
            });

            const jsonObject = JSON.parse(response);
            const expireTime = jsonObject.expires_in;
            return String(expireTime);
        } catch (error) {
            return null;
        }
    }

    private static async getUserInfoList(accessToken: string): Promise<string[] | null> {
        const url = GoogleUtils.TOKEN_INFO_URL + accessToken;

        try {
            const response = await new Promise<string>((resolve, reject) => {
                get(url, (response) => {
                    let data = '';
                    response.on('data', (chunk) => {
                        data += chunk;
                    });

                    response.on('end', () => {
                        resolve(data);
                    });
                }).on('error', (error) => {
                    console.error("Failed to connect to " + GoogleUtils.TOKEN_INFO_URL);
                    reject(error);
                });
            });

            const jsonObject = JSON.parse(response);
            const userId = jsonObject.user_id;
            const userEmail = jsonObject.email;

            return [userId, userEmail];
        } catch (error) {
            return null;
        }
    }
}

export default GoogleUtils;
