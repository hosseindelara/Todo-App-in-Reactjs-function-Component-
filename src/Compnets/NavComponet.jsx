import React from 'react'
import { Row, Col, Nav, Badge } from 'react-bootstrap'
export default function NavComponet(props) {

    const { TodoList,MenuAll,MenuTodo,MenuDone,MenuTrash } = props;
    let menuContorlDone = '';
    let menuContorlTrash = '';
    let menuContorlTodo = '';
    let badgecontorlTodo = '';
    let badgecontorlAllTodo = '';
    let badgecontorlDone = '';
    let badgecontorlTerash = '';
    let Todotask = TodoList.filter((item) => {
        if (item.tododone || item.todoTrash)
            return false
        return true
    })
    let DoneTask = TodoList.filter((item) => {
        if (item.todoTrash || !item.tododone)
            return false
        return true
    }
    );
    let TerashTask = TodoList.filter((item) => item.todoTrash);
    if (!DoneTask.length) menuContorlDone = ' disabled ';
    if (!TerashTask.length) menuContorlTrash = ' disabled ';
    if (!Todotask.length) menuContorlTodo = ' disabled ';
    if (TodoList.length > 0) badgecontorlAllTodo = TodoList.length;
    if (Todotask.length > 0) badgecontorlTodo = Todotask.length;
    if (DoneTask.length > 0) badgecontorlDone = DoneTask.length;
    if (TerashTask.length > 0) badgecontorlTerash = TerashTask.length;
    return (
        <Row>
            <Col className='mt-5 mb-3'>
                <Nav fill variant="tabs" defaultActiveKey='All'>
                    <Col lg={3} md={3} sm={3} xs={3} >
                        <Nav.Item >
                            <Nav.Link eventKey='All'
                            
                            onClick={MenuAll}
                            >همه
                                    <Badge variant='success'>{badgecontorlAllTodo}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={3} >
                        <Nav.Item>
                            <Nav.Link eventKey='Todo'
                                    onClick={MenuTodo}
                                className={menuContorlTodo}>درحال انجام
                                    <Badge variant='success'>{badgecontorlTodo}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={3} >
                        <Nav.Item>
                            <Nav.Link eventKey='Done'
                            onClick={MenuDone}
                                className={menuContorlDone}>انجام شده
                                    <Badge variant='success'>{badgecontorlDone}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={3} >
                        <Nav.Item>
                            <Nav.Link eventKey='Trash'
                                onClick={MenuTrash}
                                className={menuContorlTrash}>
                                سطل زباله
                                         <Badge variant='success'>{badgecontorlTerash}</Badge>
                            </Nav.Link>
                        </Nav.Item>
                    </Col>
                </Nav>
            </Col>
        </Row>
    )
}
