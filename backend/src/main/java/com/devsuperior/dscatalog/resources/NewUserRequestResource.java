package com.devsuperior.dscatalog.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.dscatalog.dto.NewUserDTO;
import com.devsuperior.dscatalog.services.NewUserService;

@RestController
@RequestMapping(value = "/new-user-request")
public class NewUserRequestResource {
	
	@Autowired
	private NewUserService service;
	
	@PostMapping
	public ResponseEntity<NewUserDTO> insert(@Valid @RequestBody NewUserDTO dto){
		NewUserDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();		
		return ResponseEntity.created(uri).body(newDto);
	}
}
