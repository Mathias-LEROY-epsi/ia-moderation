package com.saintgrall.moderatorapi.data.repository;

import java.util.List;

import com.saintgrall.moderatorapi.data.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
