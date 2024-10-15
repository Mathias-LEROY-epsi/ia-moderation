package com.saintgrall.moderatorapi.data.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tutorials")
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "title")
  private String title;

  @Column(name = "description")
  private String description;

  public Message() {
  }

  public Message(String title, String description) {
    this.title = title;
    this.description = description;
  }

  @Override
  public String toString() {
    return "Message [id=" + id + ", title=" + title + ", desc=" + description + "]";
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
