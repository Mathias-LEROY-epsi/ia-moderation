package com.saintgrall.moderatorapi.data.repository;

import com.saintgrall.moderatorapi.data.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MessageRepository extends MongoRepository<Message, Long> {
    Optional<Message> findById(String id);
}
