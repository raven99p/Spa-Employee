import { Button, Layout, Menu, Breadcrumb, Table, Space, Alert, notification } from 'antd';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {deleteEmp} from '../../utils/fetch_fun';
const { Header, Footer, Content } = Layout;


export async function getServerSideProps() {
  console.log('fetching..');
  try {
    const res = await fetch(`http://localhost:2020/Employee`, {method: 'GET'});
    const data = await res.json();
    if(!data)
    return {
      notFound: true,
    }
    return {
      props:{
        data,
      },
    }}catch(e) {
        console.log(e);
        const error = true
        return {
          props:{
            error,
          },
        }
      }
    
}


export default function Employees(props) {
  const router = useRouter();
  if(props.error){
    router.replace('/employees/error');
  }
  const data = props.data;  
  
  

  // NOTE: These are the colomn of the table
  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };
  const openNotification = (id) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => {notification.close(key);deleteEmp(id)}}>
        Delete
      </Button>
    );
    notification.open({
      message: 'Confirm deletion',
      description:
        'Press delete if you wish to delete this employee ',
      btn,
      key,
      onClose: close,
    });
  };





  const columns = [ 
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
      },
      {
        title: 'First name',
        dataIndex: 'first_name',
        key: 'first_name',
      },
      {
        title: 'Last name',
        dataIndex: 'last_name',
        key: 'last_name',
      },
      {
        title: 'Activity',
        dataIndex: 'is_active',
        key: 'is_active',
        render: text => <a>{text.toString()}</a>,
      },
      {
        title: 'Date of birth',
        dataIndex: 'date_of_birth',
        key: 'date_of_birth',
      },
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button size="small" type="primary" onClick={()=>router.push('/employees/' + text.id)}>
              Edit
            </Button>
            <Button size="small" type="primary" onClick={()=>openNotification(text.id)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ];
  return (
    <Layout className="layout">
    <Head>
        <title>Postem</title>
    </Head>
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" >
        <Link href="/">
              <a> Postem </a>
        </Link>
        </Menu.Item>
        <Menu.Item key="2">
        <Link href="/employees">
              <a> Employees </a>
        </Link>
        </Menu.Item>
        <Menu.Item key="3" >
        <Link href="/employees/hire">
              <a> Hire </a>
        </Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}/>

      <div className="site-layout-content">
      <Table columns={columns} dataSource={data} /> 
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
    <Link href="/about">
              <a>About me..     </a>
    </Link>
    Powered by PostBoy
    </Footer>
  </Layout>
  )
}
