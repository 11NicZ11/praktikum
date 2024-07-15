import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
const mysql = require('mysql2');
const express = require('express');


const FetchTest = () => {

    var con = mysql.createConnection({
        host: "localhost",
        user: 'web-admin',
        password: '12345678',
        database: "pen_and_paper_db"
    })

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });

    return (

        { mysql }

    );




}

export default FetchTest;