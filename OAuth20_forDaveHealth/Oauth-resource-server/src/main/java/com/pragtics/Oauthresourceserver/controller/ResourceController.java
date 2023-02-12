package com.pragtics.Oauthresourceserver.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResourceController {

    //@GetMapping("/api/users")
    @GetMapping("/rest/resource")
    public String[] getAccess() {

        return new String[]{"You have got access to the resource server!"};
    }
}
