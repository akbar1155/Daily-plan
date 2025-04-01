"use client"

import { useState } from "react"
import { PlusOutlined } from '@ant-design/icons'
import { Typography, Button, Row, Col } from 'antd'
import { NoteCard } from "./components/note-card"
import { AddNoteForm } from "./components/add-note"


const { Title } = Typography

export type Note = {
    id: string
    title: string
    content: string
    date: Date
    color?: string
}

export function NotesContainer() {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: "1",
            title: "Meeting with team",
            content: "Discuss project timeline and deliverables",
            date: new Date(),
            color: "#e6f7ff" // light blue
        },
        {
            id: "2",
            title: "Buy groceries",
            content: "Milk, eggs, bread, fruits",
            date: new Date(Date.now() - 86400000),
            color: "#f6ffed" // light green
        },
        {
            id: "3",
            title: "Call mom",
            content: "Don't forget to call mom on her birthday",
            date: new Date(Date.now() + 86400000 * 2),
            color: "#fffbe6" // light yellow
        }
    ])

    const [isAddingNote, setIsAddingNote] = useState(false)

    const addNote = (note: Omit<Note, "id" | "date">) => {
        const newNote: Note = {
            ...note,
            id: Math.random().toString(36).substring(2, 9),
            date: new Date()
        }
        setNotes([newNote, ...notes])
        setIsAddingNote(false)
    }

    const deleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id))
    }

    const updateNote = (updatedNote: Note) => {
        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note))
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Title level={2}>Notes</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsAddingNote(true)}
                >
                    Add Note
                </Button>
            </div>

            {isAddingNote && (
                <div style={{ marginBottom: '24px' }}>
                    <AddNoteForm onSubmit={addNote} onCancel={() => setIsAddingNote(false)} />
                </div>
            )}

            <div style={{ height: 'calc(100vh - 200px)', overflowY: 'auto', padding: '4px' }}>
                <Row gutter={[16, 16]}>
                    {notes.map(note => (
                        <Col xs={24} sm={12} lg={8} key={note.id}>
                            <NoteCard
                                note={note}
                                onDelete={deleteNote}
                                onUpdate={updateNote}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}
export default NotesContainer;