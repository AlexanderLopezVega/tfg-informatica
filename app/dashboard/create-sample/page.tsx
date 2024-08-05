"use client"

import ModelRenderer from '@/components/modelRenderer';
import TagsInput from '@/components/tagsInput';
import { authFetch } from '@/src/authFetch';
import { UploadOutlined } from '@ant-design/icons';
import { Steps, Form, Input, Button, Row, Col, Space, Divider, Upload, Flex, Typography, Select, SelectProps, Tag, UploadFile, UploadProps, Spin } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const { Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

interface Metadata {
    name: string;
    description?: string;
    tags: string[];
}
interface ModelDTO {
    model: string;
}
interface JobStatus<T> {
    id: string;
    status: number;
    data: T;
}

interface MetadataStepProps {
    metadata?: Metadata;
    setMetadata: React.Dispatch<React.SetStateAction<any>>;
    nextStep: () => void;
}
interface ModelStepProps {
    nextStep: () => void;
    previousStep: () => void;
}
interface SummaryStepProps {
    metadata?: Metadata;
    finish: () => void;
    previousStep: () => void;
}

//  Auxiliary components
const MetadataStep: React.FC<MetadataStepProps> = ({ metadata, nextStep, setMetadata }) => {
    const [form] = Form.useForm();

    const onFinish = (values: Metadata) => {
        setMetadata(values);
        nextStep();
    };
    const tagOptions: SelectProps['options'] = [
        {
            value: 'Alex',
            label: 'Alex',
        },
        {
            value: 'Carlos',
            label: 'Carlos',
        },
        {
            value: 'David',
            label: 'David',
        }
    ];

    return (
        <>
            <Form
                name="metadata-form"
                form={form}
                onFinish={onFinish}
                initialValues={metadata}
                autoComplete='off'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item>
                    <Space>
                        <Button disabled={true}>
                            Back
                        </Button>
                        <Button type="primary" htmlType='submit'>
                            Next
                        </Button>
                    </Space>
                </Form.Item>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name cannot be empty" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <TextArea rows={5} />
                </Form.Item>
                <Form.Item name="tags" label="Tags">
                    <Select
                        mode="tags"
                        placeholder="Enter tags here"
                        options={tagOptions}>
                    </Select>
                </Form.Item>
            </Form>
        </>
    );
};

const ModelStep: React.FC<ModelStepProps> = ({ nextStep, previousStep }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [jobStatus, setJobStatus] = useState<JobStatus<ModelDTO>>();
    const [modelFile, setModelFile] = useState<string>();
    let intervalID = useRef<NodeJS.Timeout>();

    const pollJobStatus = useCallback(() => {
        const data = new FormData();

        authFetch(
            `http://localhost:5047/api/model/job-${jobStatus.id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }
        ).then((response: Response) => response.json()
            .then((data: JobStatus<ModelDTO>) => {
                if (data.status === 1)
                    setJobStatus(data);

            }));
    }, [jobStatus?.id]);

    useEffect(() => {
        if (!jobStatus) return;

        switch (jobStatus.status) {
            case 0: {
                intervalID.current = setInterval(pollJobStatus, 1000);
            } break;
            case 1: {
                setModelFile(jobStatus.data.model);
                clearInterval(intervalID.current);
            } break;
        }

    }, [jobStatus, pollJobStatus]);

    const props: UploadProps = {
        accept: 'image/jpg, image/jpeg, image/png',
        multiple: false,
        maxCount: 1,
        onRemove: (file) => {
            //  In theory, there should only be 1 element            
            setFileList([]);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList: fileList
    };

    const onGenerateModel = () => {
        authFetch(
            "http://localhost:5047/api/model/start-job",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response: Response) => response.json()
            .then((data: JobStatus<ModelDTO>) => {
                console.log("Got a response!", data);
                setJobStatus(data);
            }));
    };
    const onFinish = () => {
        nextStep();
    };

    return (
        <>
            <Space>
                <Button onClick={() => previousStep()}>Back</Button>
                <Button type="primary" disabled={true} onClick={() => onFinish()}>Next</Button>
            </Space>

            <div style={{ paddingTop: 15, paddingBottom: 15 }} />

            <Dragger  {...props} style={{ maxHeight: 200 }}>
                <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                </p>
                <p className="ant-upload-text">Click or drag image to this area to upload</p>
                <p className="ant-upload-hint">
                    Only JPG, JPEG and PNG files supported. Make sure your background has as little details as possible.
                </p>
            </Dragger>

            <Flex justify='center' style={{ paddingTop: 20, paddingBottom: 20 }}>
                <Button type="primary" onClick={onGenerateModel}>
                    Generate model
                </Button>
            </Flex>

            {jobStatus && jobStatus.status === 0 && <Spin tip="Generating model" />}
            {jobStatus && jobStatus.status === 1 && <ModelRenderer model={modelFile} />}
        </>
    );
};

const SummaryStep: React.FC<SummaryStepProps> = ({ metadata, finish, previousStep }) => {
    const tagsComponent = metadata?.tags.map((tag: string) => (<Tag key={tag}>{tag}</Tag>));

    return (
        <>
            <Space>
                <Button onClick={previousStep}>Back</Button>
                <Button type="primary" onClick={previousStep}>Finish</Button>
            </Space>

            <div style={{ marginTop: 10, marginBottom: 10 }}>
                <Text strong>Metadata</Text>
            </div>
            <Row>
                <Col span={4}>
                    <Text type="secondary">Name:</Text>
                </Col>
                <Col span={19} offset={1}>
                    <Text>{metadata?.name ?? "No name"}</Text>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    <Text type="secondary">Description:</Text>
                </Col>
                <Col span={19} offset={1}>
                    <Text>{metadata?.description ?? "No descrtipion"}</Text>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    <Text type="secondary">Tags:</Text>
                </Col>
                <Col span={19} offset={1}>
                    {tagsComponent}
                </Col>
            </Row>

            <Divider />

            <div style={{ marginTop: 10, marginBottom: 10 }}>
                <Text strong>3D Model</Text>
            </div>

            <ModelRenderer />
        </>
    );
};

//  Main component
const CreateSampleForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [metadata, setMetadata] = useState();

    const nextStep = () => setCurrentStep(currentStep + 1);
    const previousStep = () => setCurrentStep(currentStep - 1);

    const onFinish = () => {
        console.log("Finished!");
    };

    const steps = [
        {
            title: 'Metadata',
            content: <MetadataStep metadata={metadata} setMetadata={setMetadata} nextStep={nextStep} />
        },
        {
            title: '3D Model',
            content: <ModelStep nextStep={nextStep} previousStep={previousStep} />
        },
        {
            title: 'Summary',
            content: <SummaryStep metadata={metadata} finish={onFinish} previousStep={previousStep} />
        }
    ];

    return (
        <>
            <Row>
                <Col span={12} offset={6}>
                    <Steps current={currentStep} items={steps} style={{ paddingTop: 20, paddingBottom: 20 }} />
                    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                        {steps[currentStep].content}
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default CreateSampleForm;