package com.saintgrall.moderatorapi.data.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Message")
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "content")
  private String content;

  @Column(name = "visible")
  private Boolean visible;

  @Column(name = "creation_date")
  private Date creation_date;

  public Message() {
  }

  public Message(String content, Boolean visible) {
    this.content = content;
    this.visible = visible;
    this.creation_date = new Date();
  }

  @Override
  public String toString() {
    return "Message [id=" + id + ", content=" + content + ", visible=" + visible + ", creation_date=" + creation_date + "]";
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
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
    return creation_date;
  }

  public void setCreationDate(Date creation_date) {
    this.creation_date = creation_date;
  }
}
