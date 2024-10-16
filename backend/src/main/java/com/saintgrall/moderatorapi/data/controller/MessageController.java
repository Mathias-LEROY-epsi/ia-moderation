package com.saintgrall.moderatorapi.data.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.saintgrall.moderatorapi.data.model.Message;
import com.saintgrall.moderatorapi.data.repository.MessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MessageController {

    final MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getAllmessages() {
        try {
            List<Message> messages = new ArrayList<>(messageRepository.findAll());

            if (messages.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(messages, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable("id") String id) {
        try {
            Optional<Message> messageData = messageRepository.findById(id);
            if (messageData.isPresent()) {
                return new ResponseEntity<>(messageData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de la récupération du message: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/messages")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        try {
            Message newMessage = messageRepository.save(new Message(message.getContent(), message.getVisible(), message.getReasons()));
            return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/messages/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable("id") String id, @RequestBody Message message) {
        Optional<Message> messageData = messageRepository.findById(id);

        if (messageData.isPresent()) {
            Message originalMessage = messageData.get();
            originalMessage.setContent(message.getContent());
            originalMessage.setVisible(message.getVisible());
            originalMessage.setReasons(message.getReasons());
            originalMessage.setCreationDate(message.getCreationDate());
            return new ResponseEntity<>(messageRepository.save(originalMessage), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Message> deleteMessage(@PathVariable("id") String id) {
        Optional<Message> messageData = messageRepository.findById(id);

        if (messageData.isPresent()) {
            messageRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
