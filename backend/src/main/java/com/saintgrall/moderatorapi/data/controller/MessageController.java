package com.saintgrall.moderatorapi.data.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.saintgrall.moderatorapi.data.model.Message;
import com.saintgrall.moderatorapi.data.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
			List<Message> messages = new ArrayList<>();
            messages.addAll(messageRepository.findAll());

			if (messages.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(messages, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/messages/{id}")
	public ResponseEntity<Message> getMessageById(@PathVariable("id") long id) {
		Optional<Message> messageData = messageRepository.findById(id);

        return messageData.map(message -> new ResponseEntity<>(message, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping("/messages")
	public ResponseEntity<Message> createMessage(@RequestBody Message message) {
		try {
			Message _message = messageRepository
					.save(new Message(message.getContent(), message.getVisible(), message.getCreationDate()));
			return new ResponseEntity<>(_message, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/messages/{id}")
	public ResponseEntity<Message> updateMessage(@PathVariable("id") long id, @RequestBody Message message) {
		Optional<Message> messageData = messageRepository.findById(id);

		if (messageData.isPresent()) {
			Message _message = messageData.get();
			_message.setContent(message.getContent());
			_message.setVisible(message.getVisible());
			_message.setCreationDate(message.getCreationDate());
			return new ResponseEntity<>(messageRepository.save(_message), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
