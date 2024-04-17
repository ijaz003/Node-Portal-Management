const express=require('express');
const Router=express.Router();
const app=express();
const SignupData=require('../Controllers/SignupController');
const SigninData=require('../Controllers/SigninController');
const uploadFile=require('../Controllers/uploadFile');
const ReadData=require('../Controllers/Read');
const uploadData=require('../Multer/Multer')
const studentData=require('../Controllers/StudentController');
const outputData=require('../Controllers/output')
const studentSignInData=require('../Controllers/StudentSignIn')

Router.route('/signUp').post(SignupData);
Router.route('/signIn/:userName/:password').get(SigninData);
Router.route('/studentSignIn/:userName/:password').get(studentSignInData);
Router.route('/read').get(ReadData);
Router.route('/studentData').post(studentData)
Router.route('/output').post(outputData)

// Router.route('/upload').post(uploadData,uploadFile );
module.exports=Router