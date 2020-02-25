import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import AllTodos from './AllTodos'
import MiladitoJalali from './MiladitoJalali'
import NavComponet from './NavComponet';
//import FormGenrit from './FormGenrit'
//import CalendarShamsi from './CalendarShamsi'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import {  Button } from "react-bootstrap";
export default class Todoapp extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            TodoList: [],
            status: 'All',
            selectedDay:null,
            setSelectedDay:null

        }
    }
    HandelOnchngTodo = (e) => {
        this.setState({
            title: e.target.value
        })
    }



    HandleSubmit = (e) => {
        e.preventDefault();
        let NowDate = new Date();
        let timenow = NowDate.getTime();
        let Yearmiladi = NowDate.getFullYear();
        let montMiladi = NowDate.getMonth() + 1;
        let DayMiladi = NowDate.getDate();
        let DaleShamsil = <MiladitoJalali
            yers={Yearmiladi}
            mont={montMiladi}
            day={DayMiladi}
        />
       // let dayend=  <CalendarShamsi/>
        this.setState({
            TodoList: [

                {
                    todotitle: this.state.title,
                    tododone: false,
                    todoTrash: false,
                    id: timenow,
                    DateGenerit: DaleShamsil,
                    EndDay:this.state.selectedDay


                },
                ...this.state.TodoList],
            title: ''
        })

    }


    HandelDone = idin => {
        this.setState(state => ({
            TodoList: state.TodoList.map((todo, indexTodo) => {
                if (indexTodo === idin) {
                    todo.tododone = !todo.tododone
                    //    todo.status=todo.status==='All'||'Trash'?'Done':'All'
                }
                return todo;
            })
        }));

    }


    handelMenuAll = () => this.setState({ status: 'All' })
    handelMenuTodo = () => this.setState({ status: 'Todo' })
    handelMenuDone = () => this.setState({ status: 'Done' })
    handelMenuTrash = () => this.setState({ status: 'Trash' })


    HandelTerash = (index) => {
        this.setState(item => ({
            TodoList: item.TodoList.map((item2, indexmap) => {
                if (indexmap === index) {
                    item2.todoTrash = !item2.todoTrash;
                    // item2.status=item2.status==='All'||'Done'?'Trash':'All'
                }
                return item2
            })
        }))
    }

    render() {

        const { TodoList, status } = this.state;

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

        let render = [];
        if (status === 'Trash') { render = TerashTask }
        else if (status === 'Todo') { render = Todotask }
        else if (status === 'Done') { render = DoneTask }
        else { render = TodoList }

        return (
            <div>
                <Container>
                    <Row>
                        <Col className='mt-5 mb-5'>
                                <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                     <Form onSubmit={this.HandleSubmit}>
                                     <Form.Row>
            <Col lg={6} md={6} sm={6} xs={12} className='mt-3'>
                <Form.Control
                    placeholder='اضافه کردن کار....'
                    type='text'
                    value={this.state.title}
                    onChange={this.HandelOnchngTodo}
                />
            </Col>
            <Col lg={3} md={3} sm={6} xs={12} className='mt-3'>
                <DatePicker
                    value={this.state.selectedDay}
                    onChange={this.state.setSelectedDay}
                   // minimumDate={minimumDates}
                    inputPlaceholder="انتخاب روز پایان"
                    shouldHighlightWeekends
                    locale="fa"
                />
            </Col>
            <Col lg={3} md={3} sm={12} xs={12} className='mt-3'>
                <Button
                    block
                    type='submit'
                >اضافه کن</Button>
            </Col>
            {/* { selectedDay?<CalendarShamsi DateObjct={selectedDay} />:null} */}
           
        </Form.Row>
                                    </Form>
                                   </Col>
                                    <Col lg={12} md={12} sm={12} xs={12} className='mt-3'>
                                        <Form.Control
                                            type='text'
                                            placeholder='جستجو در میان کار ها'
                                        />
                                    </Col>
                                </Row>
                            
                        </Col>
                    </Row>
                    <NavComponet
                        TodoList={this.state.TodoList}
                        MenuAll={this.handelMenuAll}
                        MenuTodo={this.handelMenuTodo}
                        MenuDone={this.handelMenuDone}
                        MenuTrash={this.handelMenuTrash}

                    />
                    <Row>
                        <Col>
                            {
                                render.map((item, index) => (
                                    <AllTodos
                                        key={index}
                                        titlte={item.todotitle}
                                        id={item.id}
                                        time={item.DateGenerit}
                                        EndDayTask={item.EndDay}
                                        tododone={() => this.HandelDone(index)}
                                        TodoTerash={() => this.HandelTerash(index)}
                                        status={status}

                                    />
                                ))
                            }

                        </Col>
                    </Row>
                    
                </Container>
            </div>
        )
    }
}
