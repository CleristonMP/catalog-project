package com.devsuperior.dscatalog.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dscatalog.dto.NewUserDTO;
import com.devsuperior.dscatalog.entities.NewUser;
import com.devsuperior.dscatalog.repositories.NewUserRepository;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class NewUserService {

	@Autowired
	private NewUserRepository repository;

	@Transactional(readOnly = true)
	public Page<NewUserDTO> findAllPaged(Pageable pageable) {
		Page<NewUser> page = repository.findAll(pageable);
		return page.map(x -> new NewUserDTO(x));
	}

	@Transactional(readOnly = true)
	public NewUserDTO findById(Long id) {
		Optional<NewUser> obj = repository.findById(id);
		NewUser entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new NewUserDTO(entity);
	}

	@Transactional
	public NewUserDTO insert(NewUserDTO dto) {
		NewUser entity = new NewUser();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new NewUserDTO(entity);
	}

	@Transactional
	public NewUserDTO update(Long id, NewUserDTO dto) {
		try {
			NewUser entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new NewUserDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
	private void copyDtoToEntity(NewUserDTO dto, NewUser entity) {
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
	}
}
