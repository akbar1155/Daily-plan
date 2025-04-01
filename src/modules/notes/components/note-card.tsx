"use client"

import { useState } from "react"
import { format } from "date-fns"
import { EditOutlined, DeleteOutlined, CloseOutlined, BgColorsOutlined } from '@ant-design/icons'
import { Card, Typography, Button, Input, Dropdown, Tooltip } from 'antd'
import { Note } from ".."
import { Check } from "lucide-react"

const { Text, Paragraph } = Typography
const { TextArea } = Input

interface NoteCardProps {
    note: Note
    onDelete: (id: string) => void
    onUpdate: (note: Note) => void
}

export function NoteCard({ note, onDelete, onUpdate }: NoteCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(note.title)
    const [editedContent, setEditedContent] = useState(note.content)

    const colorOptions = [
        { name: "Blue", value: "#e6f7ff" },
        { name: "Green", value: "#f6ffed" },
        { name: "Yellow", value: "#fffbe6" },
        { name: "Red", value: "#fff1f0" },
        { name: "Purple", value: "#f9f0ff" },
    ]

    const handleSave = () => {
        onUpdate({
            ...note,
            title: editedTitle,
            content: editedContent,
        })
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedTitle(note.title)
        setEditedContent(note.content)
        setIsEditing(false)
    }

    const changeColor = (color: string) => {
        onUpdate({
            ...note,
            color,
        })
    }

    const colorItems = colorOptions.map(color => ({
        key: color.value,
        label: (
            <div onClick={() => changeColor(color.value)}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: color.value,
                        border: '1px solid #d9d9d9'
                    }} />
                    <span>{color.name}</span>
                </div>
            </div>
        ),
    }))

    return (
        <Card
            style={{
                background: note.color || '#fff',
                height: '100%'
            }}
            bodyStyle={{ padding: '16px' }}
            actions={isEditing ? [
                <Button
                    key="cancel"
                    icon={<CloseOutlined />}
                    onClick={handleCancel}
                    size="small"
                >
                    Cancel
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    icon={<Check />}
                    onClick={handleSave}
                    size="small"
                >
                    Save
                </Button>
            ] : [
                <Dropdown key="color" menu={{ items: colorItems }} trigger={['click']}>
                    <Tooltip title="Change color">
                        <BgColorsOutlined />
                    </Tooltip>
                </Dropdown>,
                <Tooltip key="edit" title="Edit">
                    <EditOutlined onClick={() => setIsEditing(true)} />
                </Tooltip>,
                <Tooltip key="delete" title="Delete">
                    <DeleteOutlined onClick={() => onDelete(note.id)} />
                </Tooltip>
            ]}
        >
            {isEditing ? (
                <div style={{ marginBottom: '12px' }}>
                    <Input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        style={{ marginBottom: '12px', background: 'rgba(255, 255, 255, 0.5)' }}
                        placeholder="Note title"
                    />
                    <TextArea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        style={{ minHeight: '100px', background: 'rgba(255, 255, 255, 0.5)' }}
                        placeholder="Note content"
                    />
                </div>
            ) : (
                <>
                    <Typography.Title level={5} style={{ marginTop: 0, marginBottom: '8px' }}>
                        {note.title}
                    </Typography.Title>
                    <Paragraph style={{ marginBottom: '12px' }}>
                        {note.content}
                    </Paragraph>
                </>
            )}
            <Text type="secondary" style={{ fontSize: '12px' }}>
                {format(note.date, "MMM d, yyyy")}
            </Text>
        </Card>
    )
}
