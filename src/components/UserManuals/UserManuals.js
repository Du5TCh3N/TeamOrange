import React, { Component,useState } from 'react';
import { Card, Col, Row,Modal } from 'antd';
import { blue } from '@ant-design/colors';

const UserManuals = () => {
    const [isModal1Open, setIsModal1Open] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [isModal3Open, setIsModal3Open] = useState(false);
    const [isModal4Open, setIsModal4Open] = useState(false);
    const showModal1 = () => {
      setIsModal1Open(true);
    };
    const showModal2 = () => {
        setIsModal2Open(true);
      };
      const showModal3 = () => {
        setIsModal3Open(true);
      };
      const showModal4 = () => {
        setIsModal4Open(true);
      };
      const cancel = () => {
        setIsModal1Open(false);
        setIsModal2Open(false);
        setIsModal3Open(false);
        setIsModal4Open(false);

      };

    
    return (

        <> <Row gutter={[16,16]}>
     
            <Col  span={24}>
                <Card  title="Library" bordered={false} onClick={showModal1} >
                     The Library module is used to provide information that may help with the allocation policy adjustment process, by showing the historical policy and allocation data percentage between 2016 to 2019.  <br/>
                     <br/>
                     Click here to show how to use it!
                </Card>
            </Col>

            <Col span={24}>
                <Card title="Model allocation" bordered={false} onClick={showModal2}>
                    The Model Allocation module is used to simulate the allocation process to generate visualisation of how the policy performs, giving better insights into analysing the alloction policy. <br/>
                    <br/>
                    Click here to show how to use it!
                </Card>
            </Col>

            <Col span={24}>
                <Card title="Save Cost" bordered={false} onClick={showModal3}>
                    The Transfer module is used to help the council identify how much money can be saved per year by swapping users from underoccupied homes to ones that would fit the users' need. <br/>
                    <br/>
                    Click here to show how to use it!
                </Card>
            </Col>
        </Row>
        
        <Modal title="Data Visualisation user m" open={isModal1Open} footer={null} onCancel={cancel}  >
        <p>Step1: open left hand side manu button "HistoryData"</p>
        <p>Step2: click "Allocation Policy" to double check the information of Royal Borough of Kingston upon Thames Housing Allocation Scheme 2017 </p>
        <p>Step3: click "Historical Data" to check the historical data over 2014 - 2022 </p>
      </Modal>

      <Modal title="Model allocation" open={isModal2Open} footer={null} onCancel={cancel}  >
        <p>Step1: open left hand side manu and click button "Model Allocation"</p>
        <p>Step2: click button "Uplload CSV file" to upload your CSV file</p>
        <p>Step3: click button "Model Solution" to have a view about a solution about CSV file </p>
        <p>Step3: click button "Simulation" to change the policy and make a simulation to compare two graph</p>
      </Modal>

      <Modal title="Save Cost" open={isModal3Open} footer={null} onCancel={cancel}  >
        <p>Step1: open left hand side click button "Transfer"</p>
        <p>Step2: click "Upload CSV file" to upload a CSV file</p>
        <p>Step3: click "Transfer Data" to have a view about a solution about CSV file </p>
      </Modal>     
        </>
    )
}

export default UserManuals;
