package com.devsuperior.dscatalog.resources;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dscatalog.dto.UserDTO;
import com.devsuperior.dscatalog.dto.UserInsertDTO;
import com.devsuperior.dscatalog.services.RecoverService;

@RestController
@RequestMapping(value = "/recover")
public class RecoverResource {
	
	@Autowired
	private RecoverService service;
	
	@GetMapping(value = "/{email}")
	public ResponseEntity<UserDTO> findByEmail(@PathVariable String email){
		UserDTO dto = service.findByEmail(email);		
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserInsertDTO dto) {
		UserDTO newDto = service.recover(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
}
