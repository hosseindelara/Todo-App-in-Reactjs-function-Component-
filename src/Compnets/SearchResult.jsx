import { Card, Button, Row, Col } from 'react-bootstrap'
import React from 'react'

export default function SearchResult(props) {


    let statusBtnEdit = '';
    if (props.status === 'Done') { statusBtnEdit = 'fa fa-pencil disabled' }
    else if (props.status === 'Trash') { statusBtnEdit = 'fa fa-pencil disabled' }
    else { statusBtnEdit = 'fa fa-pencil ' }

    let statusBtnTrash = '';
    let statusBtnTrashNote = '';
    if (props.status === 'Done') {
        statusBtnTrash = 'fa fa-trash'
        statusBtnTrashNote = ' سطل زباله '
    }
    else if (props.status === 'Trash') {
        statusBtnTrash = 'fa fa-refresh'
        statusBtnTrashNote = ' باز گشت  '
    }
    else {
        statusBtnTrash = 'fa fa-trash'
        statusBtnTrashNote = ' سطل زباله '
    }

    let statusBtnDone = ''
    let statusBtnDoneNote = ''
    if (props.status === 'Done') {
        statusBtnDone = ' fa fa-arrow-right '
        statusBtnDoneNote = ' بازگشت به در حال انجام  '
    }
    else if (props.status === 'Trash') {
        statusBtnDone = 'fa  fa-check disabled '
        statusBtnDoneNote = 'انجام شده '
    }
    else {
        statusBtnDone = ' fa  fa-check '
        statusBtnDoneNote = ' انجام شده'
    }


    return (
        <Card className='mt-3 mb-3'>
            <Card.Body>
                {props.titlte}
                <Row>
                    <Col>ایجاد شده در:<br/>
                    <span>{new Date(props.id).toLocaleTimeString()}</span><br/>
                        <span> {props.time}</span>
                    </Col>
                    <Col>
                        تاریخ پایان :
                        <p>{props.EndDayTask}</p>
                    </Col>
                </Row>

            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <Button
                            onClick={props.tododone}
                            variant='success'
                            className={statusBtnDone}

                        >{statusBtnDoneNote}</Button>
                    </Col>
                    <Col>
                        <Button
                            variant='success'
                            className={statusBtnEdit}


                        > ویرایش </Button>
                    </Col>
                    <Col>
                        <Button
                            onClick={props.TodoTerash}
                            variant='danger'
                            className={statusBtnTrash}
                        >{statusBtnTrashNote}</Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}
