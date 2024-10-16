package com.saintgrall.moderatorapi.data.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Message")
public class Message {

    @Id
    private String id;

    private String content;

    private Boolean visible;

    private String[] reasons;

    private Date creationDate;

    public Message(String content, Boolean visible, String[] reasons) {
        this.content = content;
        this.visible = visible;
        this.reasons = reasons;
        this.creationDate = new Date();
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Message{" +
                "id='" + id + '\'' +
                ", content='" + content + '\'' +
                ", visible=" + visible +
                ", reasons=" + java.util.Arrays.toString(reasons) +
                ", creationDate=" + creationDate +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public String[] getReasons() {
        return reasons;
    }

    public void setReasons(String[] reasons) {
        this.reasons = reasons;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
}