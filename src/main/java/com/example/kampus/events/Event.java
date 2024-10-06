package com.example.kampus.events;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "events")
public class Event {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "club", nullable = false)
  private String club;

  @Column(name = "description")
  private String description;

  @Column(name = "date", nullable = false)
  private LocalDate date;

  @Column(name = "registration_link")
  private String registrationLink;

  // Getters and setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getClub() {
    return club;
  }

  public void setClub(String club) {
    this.club = club;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getRegistrationLink() {
    return registrationLink;
  }

  public void setRegistrationLink(String registrationLink) {
    this.registrationLink = registrationLink;
  }
}
