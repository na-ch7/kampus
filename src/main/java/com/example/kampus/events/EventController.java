package com.example.kampus.events;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/events")
public class EventController {

  @Autowired
  private EventRepository eventRepository;

  @GetMapping
  public List<Event> getAllevents() {
    return eventRepository.findAll();
  } 

  @GetMapping("/{id}")
  public Event getEventById(@PathVariable Long id) {
    return eventRepository.findById(id).get();
  }

  @PostMapping
  public Event createevent(@RequestBody Event event) {
    return eventRepository.save(event);
  }

  @PutMapping("/{id}")
  public Event updateevent(@PathVariable Long id, @RequestBody Event event) {
    Event existingevent = eventRepository.findById(id).get();
    existingevent.setName(event.getName());
    existingevent.setClub(event.getClub());
    existingevent.setDescription(event.getDescription());
    existingevent.setDate(event.getDate());
    existingevent.setRegistrationLink(event.getRegistrationLink());
    return eventRepository.save(existingevent);
  }

  @DeleteMapping("/{id}")
  public String deleteevent(@PathVariable Long id) {
    try {
      eventRepository.findById(id).get();
      eventRepository.deleteById(id);
      return "event deleted successfully";
    } catch (Exception e) {
      return "event not found";
    }
  }
}