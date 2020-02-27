import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import AllTodos from './AllTodos'
import NavComponet from './NavComponet';
import SearchTodo from './SearchTodo';
import DatePicker from "react-modern-calendar-datepicker";
import { ToastContainer, toast } from 'react-toastify';


export default function Todoapp() {
    const [title, settitle] = useState('')
    const [status, setstatus] = useState('All')
    const [TodoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoListStorig')) || [])
    const [selectedDay, setSelectedDay] = useState(null);

    const HandelOnchngTodo = e => settitle(e.target.value)

    const HandleSubmit = (e) => {
        e.preventDefault();
        let timenow = new Date().getTime();

        let DateShamsi = MiladotoShamsi()[0] + '/' + MiladotoShamsi()[1] + '/' + MiladotoShamsi()[2]
        setTodoList([

            {
                todotitle: title,
                tododone: false,
                todoTrash: false,
                id: timenow,
                DateGenerit: DateShamsi,
                EndDay: selectedDay ? selectedDay.year + '/' + selectedDay.month + '/' + selectedDay.day : 'زمان پایان انتخاب نشده'

            },
            ...TodoList],
        );

        settitle('');



        toast.success('کار جدید اضافه شد', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
    useEffect(() => {
        localStorage.setItem('todoListStorig', JSON.stringify(TodoList))
    })

    const HandelDone = idin => {
        TodoList.map((item) => {
            if (item.id === idin) {

                item.tododone = !item.tododone
                if (item.todoTrash) {
                    item.todoTrash = false
                }

            }
            else {
                return item
            }
        })
        setTodoList([...TodoList])
    }
    const handelMenuAll = () => setstatus('All')
    const handelMenuTodo = () => setstatus('Todo')
    const handelMenuDone = () => setstatus('Done')
    const handelMenuTrash = () => setstatus('Trash')

    const HandelTerash = (iditem) => {
        if (TodoList) {
            TodoList.map((item) => {
                if (item.id === iditem) {
                    item.todoTrash = !item.todoTrash
                    if (item.tododone) {
                        item.tododone = false
                    }
                }
                else {
                    return item
                }
            })
            setTodoList([...TodoList])
        }
    }

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

    const minimumDates = {
        year: MiladotoShamsi()[0],
        month: MiladotoShamsi()[1],
        day: MiladotoShamsi()[2]
    };
    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={12} xs={12} className='mt-5 mb-5'>
                    <Form onSubmit={HandleSubmit}>
                        <Form.Row>
                            <Col lg={6} md={6} sm={6} xs={12} className='mt-3'>
                                <Form.Control
                                    placeholder='اضافه کردن کار....'
                                    type='text'
                                    value={title}
                                    onChange={HandelOnchngTodo}
                                />
                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12} className='mt-3'>
                                <DatePicker
                                    value={selectedDay}
                                    onChange={setSelectedDay}
                                    minimumDate={minimumDates}
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
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
            <SearchTodo
                itemSerch={TodoList}
            />
            <NavComponet
                TodoList={TodoList}
                MenuAll={handelMenuAll}
                MenuTodo={handelMenuTodo}
                MenuDone={handelMenuDone}
                MenuTrash={handelMenuTrash} />
            <Row>
                <Col>
                    {
                        render.map((item, index) => (
                            <AllTodos
                                key={index}
                                Arryin={item}
                                tododone={() => HandelDone(item.id)}
                                TodoTerash={() => HandelTerash(item.id)}
                            />
                        ))
                    }
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

function MiladotoShamsi() {


    function gregorian_to_jalali(gy, gm, gd) {
        var g_d_m, jy, jm, jd, gy2, days;
        g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        if (gy > 1600) {
            jy = 979;
            gy -= 1600;
        } else {
            jy = 0;
            gy -= 621;
        }
        gy2 = (gm > 2) ? (gy + 1) : gy;
        days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
        jy += 33 * (parseInt(days / 12053));
        days %= 12053;
        jy += 4 * (parseInt(days / 1461));
        days %= 1461;
        if (days > 365) {
            jy += parseInt((days - 1) / 365);
            days = (days - 1) % 365;
        }
        jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
        jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        return [jy, jm, jd];
    }

    let newDate = new Date()
    let finalDate = gregorian_to_jalali(newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate());

    return (finalDate)
}