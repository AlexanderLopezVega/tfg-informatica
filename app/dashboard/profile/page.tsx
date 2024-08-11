"use client"

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Typography } from "antd";

const { Title } = Typography;

const ProfilePage: React.FC = () => {
    return (
        <>
            <Row>
                <Col span={16} offset={4}>
                    <Row>
                        <Col span={24}>
                            <b>Username</b>
                            <p>Username goes here</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default ProfilePage;