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

  private Date creationDate;

  public Message(String content, Boolean visible) {
    this.content = content;
    this.visible = visible;
    this.creationDate = new Date();
  }

  @Override
  public String toString() {
    return "Message [id=" + id + ", content=" + content + ", visible=" + visible + ", creation_date=" + creationDate + "]";
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

  public Date getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(Date creationDate) {
    this.creationDate = creationDate;
  }
}


