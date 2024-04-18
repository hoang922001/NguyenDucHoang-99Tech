import React, { useState } from 'react';
import * as S from './style';
import moment from 'moment';
import task from '../../services/apis/task';
import { getListTask } from '../../store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';

const { Option } = S.SelectFiled;

const UpdateTask = (props) => {
  const dispatch = useDispatch();
  const { handleCancel, isModalVisible } = props;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('');
  const [form] = Form.useForm();
  const editButton = useRef(null)
  function onChangeDate(date, dateString) {
    setDate(dateString);
  }
  function onChangeTime(time, timeString) {
    setTime(timeString);
  }

  function handleSelectPriority(value) {
    setPriority(value);
  }

  const onFinish = async (values) => {
    editButton.current.setAttribute("disabled",true)
    task
      .updateTaskApi(props?.item?.id, {
        ...values,
        due: `${date} ${time}` || props?.item?.due,
        priority: priority || props?.item?.priority,
        completed: props?.item?.completed,
      })
      .then(() => {
        dispatch(getListTask({ page: props.page, perPage: props.perPage }));
        handleCancel();
        toast('Successfully!');
        editButton.current.setAttribute("disabled",true)
      })
      .catch((err) => {
        // toast('Failure...');
      });
  };

  return (
    <S.ModalTask footer="" visible={isModalVisible} onCancel={handleCancel}>
      <S.FormAntd
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          'name': props?.item?.name,
          'description': props?.item?.description,
        }}
      >
        <S.Wrapper>
          <S.FormAntd.Item
            name="name"
            rules={[
              { required: true, message: 'Please input your task name!' },
            ]}
          >
            <S.Name placeholder="Name of the tasks..." />
          </S.FormAntd.Item>
          <hr />
          <S.FormAntd.Item name="description">
            <S.Describe placeholder="Description..." />
          </S.FormAntd.Item>

          <S.Option>
            <S.SelectDate onChange={onChangeDate} />
            {date && (
              <S.SelectTime
                onChange={onChangeTime}
                defaultValue={moment('00:00:00', 'HH:mm:ss')}
              />
            )}

            <S.SelectFiled
              defaultValue={props.item?.priority}
              style={{ width: 120 }}
              onChange={handleSelectPriority}
            >
              <Option value="2">High</Option>
              <Option value="1">Medium</Option>
              <Option value="0">Low</Option>
            </S.SelectFiled>
          </S.Option>
        </S.Wrapper>

        <S.ButtonWrapper>
          <S.ButtonFiled $width={90} onClick={handleCancel}>
            Cancel
          </S.ButtonFiled>
          <S.ButtonFiled
            $width={110}
            type="primary"
            htmlType="submit"
            style={{ marginLeft: '10px' }}
            ref={editButton}
          >
            Update task
          </S.ButtonFiled>
        </S.ButtonWrapper>
      </S.FormAntd>
    </S.ModalTask>
  );
};

export default UpdateTask;
