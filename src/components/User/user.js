import React, { Component,useState } from 'react';
import { Card, Avatar, Modal, Form, Input } from 'antd';
// User page

function  User (props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { Meta } = Card;
  const  accountId="K0001"
  const email=""
  const fullName="User1"
  const role = "role"
  const avatarUrl="https://www.kingston.gov.uk/site/dist/images/site-logo-white.svg"
  
        return (
            <div className="flex   h-screen">
            <Card
            className='h-1/2  '
              hoverable
              style={{  backgroundColor: '#f5f5f5' }}
            
            >
              <Meta
                
                
                description={
                  <>
                   <Avatar  className=" mb-5" style={{
                            backgroundColor: "#3c3c3c",
                        }} size={48} src={avatarUrl}/>
                   <Form
                    disabled={true}
    name="basic"

    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
   
 
    autoComplete="off"
  >
    <Form.Item
      label="Account ID"
      name="Account ID"
      initialValue={"K01"}
    
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Role"
      name="Role"
        initialValue={"Senior manager"}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Fullname"
      name="Name"
        initialValue={"User01"}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="Email address"
      initialValue={"user01@kingston.gov.uk"}
       
    >
      <Input />
    </Form.Item>
 

 

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
   
    </Form.Item>
  </Form>
                  </>
                }
              />
              {/* <button className="mt-2 text-blue-500" onClick={showModal}>
                Edit
              </button> */}
            </Card>
        
          </div>
        );
    
}

export default User;
