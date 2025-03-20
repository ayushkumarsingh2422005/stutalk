from bs4 import BeautifulSoup
import json

table1 = """
<table width="95%" border="1" align="center" bgcolor="#ffffff" style="font-family: Arial, Helvetica, sans-serif;
            font-size: 12px; font-weight: lighter; color: #000;" cellspacing="0" cellpadding="6">
    <tbody>
        <tr bgcolor="#ffffff">
            <td align="center" style="font-family: Arial; font-weight: bold; color: Black;">
                <span style="font-size: 16px;">National Institute of Technology, Jamshedpur</span>
                <br>
            </td>
        </tr>
        <tr bgcolor="#ffffff">
            <td height="35" align="center" style="font-family: Arial; font-size: 16px; font-weight: bold;
                    color: Black;">
                Marksheet of examination held in <span id="lblsession">3</span> : <span id="lblDegreeName"
                    style="font-weight:bold;">B.Tech (Hons.)</span><span id="lblSchemetype"
                    style="font-weight:bold;"></span>
            </td>
        </tr>
        <tr>
            <td>
                <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
                    <tbody>
                        <tr>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 4%">
                                Name :
                            </td>
                            <td style="width: 15%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblStudentName">AKASH JAISWAL</span>
                            </td>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 1%">
                                Branch :
                            </td>
                            <td style="width: 13%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblBranchName">COMPUTER SCIENCE AND ENGINEERING</span>
                            </td>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 5%">
                                Semester:
                            </td>
                            <td style="width: 10%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblSemester">III</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 6%">
                                Father's Name :
                            </td>
                            <td style="width: 10%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblFatherName">SUMAN JAISWAL</span>
                            </td>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 5%">
                                Roll No :
                            </td>
                            <td style="width: 10%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblRollNo">2023UGCS055</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td>


                <table width="100%" border="1" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-style: normal;
                                    font-weight: bold; color: #000;" align="center">
                            <td width="8%">Subject Code</td>
                            <td width="30%">Subject</td>
                            <td width="5%">Test I</td>
                            <td width="5%">Test II</td>
                            <td width="5%">Assignment</td>
                            <td width="5%">Quiz Avg</td>
                            <td width="5%">END Sem</td>
                            <td width="5%">Total</td>
                            <td width="5%">Grade</td>

                        </tr>


                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CS1301
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Digital System Design
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                29.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                19.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                48.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                96
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                O
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CS1302
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Design and Analysis of Algorithms
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                24.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                20.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                40.50
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                85
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CS1303
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Discrete Mathematics
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                26.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                17.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                42.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                85
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CS1304
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Data Structure
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                19.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                17.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                31.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                67
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                C
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CS1305
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Digital System Design Lab
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                87.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                87
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CS1306
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Data Structure Lab
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                76.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                76
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                B
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CS1307
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Design and Analysis of Algorithms Lab
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                90.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                90
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                O
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                HS1301
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Introduction to Soft Skills
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                25.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                18.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                44.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                87
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                MA1301
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Probability &amp; Statistics
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                30.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                20.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                30.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                80
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>


                    </tbody>
                </table>

            </td>
        </tr>
        <tr>
            <td>

            </td>
        </tr>
        <tr>
            <td>
                <table width="100%" border="1" align="center" bgcolor="#ffffff" style="font-family: Arial, Helvetica, sans-serif;
                        font-size: 12px; font-weight: lighter; color: #000;" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td width="9%" style="padding-left: 5px; font-weight: bold;">
                                <span style="color: Green ; font-weight: bold;">Result :</span>
                            </td>
                            <td width="17%" style="padding-left: 5px;">
                                <span style="color: Green ; font-weight: bold;">
                                    <span id="lblResult">PASS</span>
                                </span>
                            </td>
                            <td width="4%" style="padding-left: 5px; font-weight: bold;">
                                SGPA
                            </td>
                            <td width="5%" style="padding-left: 5px;">
                                <span id="lblSPI">8.880000</span>
                            </td>
                            <td width="4%" style="padding-left: 5px; font-weight: bold;">
                                CGPA
                            </td>
                            <td width="4%" style="padding-left: 5px;">
                                <span id="lblCPI">8.560000</span>
                            </td>
                            <td width="5%" style="padding-left: 5px; font-weight: bold;">

                            </td>
                            <td width="8%" style="padding-right: 15px;" align="right">
                                <span id="lblTotal"></span>
                            </td>
                            <td width="5%" style="padding-right: 25px;" align="right">
                                <span id="lblTotalobt"></span>
                            </td>
                            <td width="12%" style="padding-right: 10px;" align="right">
                                <span id="lblEarnCredits"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <span style="text-align: right; color: Fuchsia;">Result Declaration Date :
                    <span id="lblPublishDate">24-12-2024</span>
                </span>
            </td>
        </tr>
        <tr>
            <td style="background-color: ThreeDLighShadow; padding-left: 15px;">
                <span style="color: Red; font-weight: bold;">Disclaimer :</span>
                <br>
                <span style="color: Blue; font-weight: bold;">NIT Jamshedpur is not responsible for
                    any inadvertent error that may have crept in to publication of the results on Institute's
                    website. The results published on the institute's website are for immediate information
                    to the examinees. The results published are provisional and subject to the modification
                    after post-publication scrutiny. If any mistake or dispute arise the result published
                    in hard copy by the Institute UGPEC/PGPEC committee will be treated as authenticate
                    and official.</span>
            </td>
        </tr>
    </tbody>
</table>
"""

table2 = """
<table width="95%" border="1" align="center" bgcolor="#ffffff" style="font-family: Arial, Helvetica, sans-serif;
            font-size: 12px; font-weight: lighter; color: #000;" cellspacing="0" cellpadding="6">
    <tbody>
        <tr bgcolor="#ffffff">
            <td align="center" style="font-family: Arial; font-weight: bold; color: Black;">
                <span style="font-size: 16px;">National Institute of Technology, Jamshedpur</span>
                <br>
            </td>
        </tr>
        <tr bgcolor="#ffffff">
            <td height="35" align="center" style="font-family: Arial; font-size: 16px; font-weight: bold;
                    color: Black;">
                Marksheet of examination held in <span id="lblsession">1</span> : <span id="lblDegreeName"
                    style="font-weight:bold;">B.Tech (Hons.)</span><span id="lblSchemetype"
                    style="font-weight:bold;"></span>
            </td>
        </tr>
        <tr>
            <td>
                <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
                    <tbody>
                        <tr>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 4%">
                                Name :
                            </td>
                            <td style="width: 15%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblStudentName">AKASH JAISWAL</span>
                            </td>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 1%">
                                Branch :
                            </td>
                            <td style="width: 13%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblBranchName">COMPUTER SCIENCE AND ENGINEERING</span>
                            </td>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 5%">
                                Semester:
                            </td>
                            <td style="width: 10%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblSemester">I</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 6%">
                                Father's Name :
                            </td>
                            <td style="width: 10%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblFatherName">SUMAN JAISWAL</span>
                            </td>
                            <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal;
                                font-weight: bold; color: #000; width: 5%">
                                Roll No :
                            </td>
                            <td style="width: 10%; font-family: Arial, Helvetica, sans-serif; font-size: 12px;
                                font-style: normal; color: #000;">
                                <span id="lblRollNo">2023UGCS055</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td>


                <table width="100%" border="1" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-style: normal;
                                    font-weight: bold; color: #000;" align="center">
                            <td width="8%">Subject Code</td>
                            <td width="30%">Subject</td>
                            <td width="5%">Test I</td>
                            <td width="5%">Test II</td>
                            <td width="5%">Assignment</td>
                            <td width="5%">Quiz Avg</td>
                            <td width="5%">END Sem</td>
                            <td width="5%">Total</td>
                            <td width="5%">Grade</td>

                        </tr>


                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CE1101
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Environmental Science
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                18.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                18.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                34.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                70
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                B
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CH1101
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Engineering Chemistry
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                20.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                18.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                32.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                70
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                B
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CH1102
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Engineering Chemistry Lab
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                73.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                73
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                B
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CS1101
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Introduction to Programming and Data Structures
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                16.50
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                19.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                27.50
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                63
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                C
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                CS1102
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Introduction to Programming and Data Structures Lab
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                83.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                83
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                EE1101
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Electrical Engineering and Measurement
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                23.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                19.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                40.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                82
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                EE1102
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Electrical Engineering and Measurement Lab
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                80.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                80
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                MA1101
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Engineering Mathematics-I
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                27.50
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                18.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                39.50
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                85
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                ME1103
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Engineering Drawing and Computer Graphics
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                80.00
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                80
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                A
                            </td>

                        </tr>



                        <tr>
                            <td width="8%" align="center"
                                style="padding-right: 25px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                MM1101
                            </td>
                            <td width="20%" align="left"
                                style="padding-left: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                Material Science
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                23.00
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                                font-size: 12px; font-style: normal; color: #000;">
                                                19.00

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td width="5%" align="center"
                                style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">

                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                23.50
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                66
                            </td>
                            <td width="5%" align="center" style="padding-right: 15px; font-family: Arial, Helvetica, sans-serif;
                                    font-size: 12px; font-style: normal; color: #000;">
                                C
                            </td>

                        </tr>


                    </tbody>
                </table>

            </td>
        </tr>
        <tr>
            <td>

            </td>
        </tr>
        <tr>
            <td>
                <table width="100%" border="1" align="center" bgcolor="#ffffff" style="font-family: Arial, Helvetica, sans-serif;
                        font-size: 12px; font-weight: lighter; color: #000;" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td width="9%" style="padding-left: 5px; font-weight: bold;">
                                <span style="color: Green ; font-weight: bold;">Result :</span>
                            </td>
                            <td width="17%" style="padding-left: 5px;">
                                <span style="color: Green ; font-weight: bold;">
                                    <span id="lblResult">PASS</span>
                                </span>
                            </td>
                            <td width="4%" style="padding-left: 5px; font-weight: bold;">
                                SGPA
                            </td>
                            <td width="5%" style="padding-left: 5px;">
                                <span id="lblSPI">8.220000</span>
                            </td>
                            <td width="4%" style="padding-left: 5px; font-weight: bold;">
                                CGPA
                            </td>
                            <td width="4%" style="padding-left: 5px;">
                                <span id="lblCPI">8.220000</span>
                            </td>
                            <td width="5%" style="padding-left: 5px; font-weight: bold;">

                            </td>
                            <td width="8%" style="padding-right: 15px;" align="right">
                                <span id="lblTotal"></span>
                            </td>
                            <td width="5%" style="padding-right: 25px;" align="right">
                                <span id="lblTotalobt"></span>
                            </td>
                            <td width="12%" style="padding-right: 10px;" align="right">
                                <span id="lblEarnCredits"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <span style="text-align: right; color: Fuchsia;">Result Declaration Date :
                    <span id="lblPublishDate">26-12-2023</span>
                </span>
            </td>
        </tr>
        <tr>
            <td style="background-color: ThreeDLighShadow; padding-left: 15px;">
                <span style="color: Red; font-weight: bold;">Disclaimer :</span>
                <br>
                <span style="color: Blue; font-weight: bold;">NIT Jamshedpur is not responsible for
                    any inadvertent error that may have crept in to publication of the results on Institute's
                    website. The results published on the institute's website are for immediate information
                    to the examinees. The results published are provisional and subject to the modification
                    after post-publication scrutiny. If any mistake or dispute arise the result published
                    in hard copy by the Institute UGPEC/PGPEC committee will be treated as authenticate
                    and official.</span>
            </td>
        </tr>
    </tbody>
</table>
"""

def collect_metadata(header):
    meta_data = {}
    for i in header:
        temp = i.find_all("td")
        for j in range(0,len(temp),2):
            meta_data[temp[j].text.replace(":","").strip()] = temp[j+1].text.strip()
    return meta_data

def collect_markdata(marks):
    marks_data = []
    for i in marks:
        temp = i.find_all("td", recursive=False)
        # marks_data[temp[0].text.replace('\n', "").strip()] = []
        temp_marks = []
        for j in range(0, len(temp)):
            temp_marks.append(temp[j].text.replace('\n', "").strip())
        marks_data.append(temp_marks)
    return marks_data[1:-1]

def collect_resultdata(result):
    result_data = {}
    result_data["SGPA"] = result[3].text.strip()
    result_data["CGPA"] = result[5].text.strip()
    return result_data
    
def table_to_json(table, user_data):
    
    # inital config
    soup = BeautifulSoup(table, "html.parser")
    html_table = soup.find("table").find("tbody")
    html_table = html_table.find_all("tr", recursive=False)

    # collection of meta data
    header = html_table[2].find("tbody").find_all("tr", recursive=False)
    meta_data = collect_metadata(header)
            
    # marks data
    marks = html_table[3].find("tbody").find_all("tr", recursive=False)
    marks_data = collect_markdata(marks)

    # cgpa data
    result = html_table[5].find("tbody").find("tr").find_all("td", recursive=False)
    result_data = collect_resultdata(result)
    # print(meta_data.keys())
    for key in meta_data.keys():
        user_data[key] = meta_data[key]
    
    user_data["marksData"][user_data["Semester"]] = marks_data
    user_data["resultData"][user_data["Semester"]] = result_data
    
    return user_data

user_data = {
    "Name": "",
    "Branch": "",
    "Semester": "",
    "Father's Name": "",
    "Roll No": "",
    "marksData": {},
    "resultData": {}
}
user_data = table_to_json(table1, user_data)
user_data = table_to_json(table2, user_data)
user_data.pop("Semester")

with open("result.json", "w") as file:
    json.dump(user_data, file, indent=4)
    