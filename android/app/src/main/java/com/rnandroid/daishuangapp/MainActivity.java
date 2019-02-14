package com.rnandroid.daishuangapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;          
import com.facebook.react.bridge.ReactContext;           
import com.mehcode.reactnative.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    protected String getMainComponentName() {
        //SplashScreen.show(this, getReactInstanceManager());  //**********需要添加的************
        return "daishaung";
    }
}
