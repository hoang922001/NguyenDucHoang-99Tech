import React, { useEffect, useState } from 'react';
import * as S from './styled';
import logo from '../../assets/images/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Menu, Tooltip } from 'antd';
import * as Icon from '../../assets/icons';
import AddTaskModal from '../../components/AddTask';
import UpdateTaskModal from '../../components/UpdateTask';
import Pomodoro from '../../vendors/Pomodoro';
import { logout } from '../../store/slices/authSlice';
import StoryQuotes from '../../components/StoryQuotes';
import lock from '../../assets/icons/lock.svg';
import select from '../../assets/icons/select.svg';
import pen from '../../assets/icons/pen.svg';
import delet from '../../assets/icons/delete.svg';
import { getListTask } from '../../store/slices/taskSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import task from '../../services/apis/task';
import { Collapse } from 'antd';
const { Panel } = Collapse;

export default function Index({ history }) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [item, setItiem] = useState({});
  const [search, setSearch] = useState('');
  const [complete, setComplete] = useState();
  const [filterAll, setFilterAll] = useState(true);
  const [sort, setSort] = useState('');

  const listTask = useSelector((state) => state.task.listTask.tasks);
  const count = useSelector((state) => state.task.listTask.count);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handlerLogout = () => {
    dispatch(logout());
  };
  const handlerSearch = (e) => {
    setTimeout(() => {
      setSearch(e.target.value);
    }, 700);
  };
  const menuUser = (
    <Menu>
      <Menu.Item onClick={handlerLogout} key="">
        Logout
      </Menu.Item>
    </Menu>
  );
  const menuSort = (
    <Menu>
      <Menu.Item onClick={() => setSort('due')} key="">
        By deadline
      </Menu.Item>
      <Menu.Item onClick={() => setSort('priority')} key="">
        By priority
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [userInfo, history, dispatch]);

  useEffect(() => {
    dispatch(
      getListTask({
        search: search.trim(),
        page: page,
        perPage: perPage,
        filter: complete,
        sort: sort,
      })
    );
  }, [page, perPage, search, complete, sort]);

  const handleDelete = () => {
    task
      .deleteTaskApi(item?.id)
      .then(() => {
        dispatch(getListTask({ page: page, perPage: perPage }));
        toast('Successfully!');
      })
      .catch((err) => {
        toast('Failure...');
      });
  };
  const content = (
    <div style={{ width: '70px', cursor: 'pointer' }}>
      <img
        src={pen}
        style={{ marginLeft: '10px' }}
        alt=""
        onClick={() => setIsModalUpdate(true)}
      />
      <img
        src={delet}
        style={{ marginLeft: '20px' }}
        onClick={handleDelete}
        alt=""
      />
    </div>
  );

  const onChange = (e, item) => {
    setItiem(item);
    if (item?.id) {
      task
        .updateTaskApi(item?.id, { completed: e.target.checked })
        .then(() => {
          dispatch(getListTask({ page, perPage }));
        })
        .catch((err) => {
          toast('Failure...');
        });
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.Img src={logo} alt="" />
        {userInfo && (
          <S.UserGroup>
            <S.Icon1
              src={userInfo.image ? userInfo.image : Icon.user}
              $width="32"
              $height="30"
              style={{ marginRight: '15px' }}
            />
            <S.Author overlay={menuUser}>
              <div>
                <S.Text
                  $cursor="pointer"
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {userInfo.username}
                </S.Text>
                <S.Icon1
                  $cursor="pointer"
                  src={Icon.down_arrow}
                  $width="20"
                  $height="15"
                  style={{ marginLeft: '3px' }}
                />
              </div>
            </S.Author>
          </S.UserGroup>
        )}
      </S.Header>
      <S.Content>
        <S.Left xl={14} lg={24} xs={24} sm={24}>
          <div style={{ display: 'flex', position: 'relative' }}>
            <S.InputFiled
              onChange={(e) => handlerSearch(e)}
              placeholder="Search task"
              $height={50}
            />
            <S.SearchIcon style={{}} src={Icon.search} />
          </div>
          <S.Option>
            <div style={{ display: 'flex' }}>
              <S.Text2
                $color={filterAll && '#6688bc'}
                onClick={() => {
                  setFilterAll(true);
                  setComplete('');
                }}
              >
                All
              </S.Text2>
              <S.Text2
                $color={complete === true && '#6688bc'}
                onClick={() => {
                  setFilterAll(false);
                  setComplete(true);
                }}
              >
                Complete
              </S.Text2>
              <S.Text2
                $color={complete === false && '#6688bc'}
                onClick={() => {
                  setFilterAll(false);
                  setComplete(false);
                }}
              >
                Todo
              </S.Text2>
              <S.Author overlay={menuSort}>
                <S.Sort>
                  <S.Icon1 src={Icon.sort} />
                  <S.Text2 style={{ fontWeight: '200' }}>Sort</S.Text2>
                </S.Sort>
              </S.Author>
            </div>
            <S.AddTask onClick={showModal}>
              <S.Icon1 src={Icon.add} />
              <S.Text2>Add task</S.Text2>
            </S.AddTask>
          </S.Option>

          <S.ListTask>
            {listTask?.map((item) => (
              <S.Task key={item?.id} $done={item?.completed}>
                <S.CheckB
                  checked={item?.completed}
                  onChange={(e) => onChange(e, item)}
                />
                <div style={{ marginLeft: '12px' }}>
                  <S.TextTask
                    style={{
                      textDecoration: item?.completed && 'line-through',
                    }}
                  >
                    {item?.name}
                  </S.TextTask>
                  {item?.description.length > 120 ? (
                    <S.CollapseField defaultActiveKey={['0']}>
                      <Panel
                        header={`${item?.description.substr(0, 20)} . . .`}
                        key="1"
                      >
                        <S.TextTask $isSmall>
                          {item?.description}
                        </S.TextTask>
                      </Panel>
                    </S.CollapseField>
                  ) : (
                    <S.TextTask $isSmall>{item?.description}</S.TextTask>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={lock} alt="" />
                    <S.TextTime
                      $color={
                        item?.priority === 0
                          ? '#20d408'
                          : item?.priority === 1
                          ? '#FC8E0D'
                          : '#ff0000'
                      }
                    >
                      {item?.due}
                    </S.TextTime>
                  </div>
                </div>
                <Tooltip placement="right" title={content} color="#FFFFFF">
                  <S.Image
                    src={select}
                    alt=""
                    onMouseOver={() => setItiem(item)}
                  />
                </Tooltip>
              </S.Task>
            ))}
          </S.ListTask>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '40px',
              bottom: '15px',
            }}
          >
            <Pagination
              defaultCurrent={1}
              current={page}
              pageSize={perPage}
              total={count}
              onChange={(page) => setPage(page)}
            />
          </div>
        </S.Left>
        <S.Right xl={10} lg={24} xs={24} sm={24}>
          <S.Time>
            <Pomodoro />
          </S.Time>
          <S.Story>
            <StoryQuotes />
          </S.Story>
        </S.Right>
        <ToastContainer />
      </S.Content>

      {/* add task modal */}
      {isModalVisible && (
        <AddTaskModal
          isModalVisible={isModalVisible}
          showModal={showModal}
          handleCancel={handleCancel}
          perPage={perPage}
          page={page}
        />
      )}

      {isModalUpdate && (
        <UpdateTaskModal
          isModalVisible={isModalUpdate}
          showModal={() => setIsModalUpdate(true)}
          handleCancel={() => setIsModalUpdate(false)}
          perPage={perPage}
          page={page}
          item={item}
        />
      )}
    </S.Wrapper>
  );
}
