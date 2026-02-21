package com.bingebay.binge_bay_backend.controller;

import com.bingebay.binge_bay_backend.dto.WatchlistItemDto;
import com.bingebay.binge_bay_backend.entity.WatchlistItem;
import com.bingebay.binge_bay_backend.repository.UserRepository;
import com.bingebay.binge_bay_backend.service.WatchlistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/watchlist")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchlistService watchlistService;
    private final UserRepository userRepository;

    private Long getUserId(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @GetMapping
    public ResponseEntity<List<WatchlistItem>> getWatchlist(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(watchlistService.getUserWatchlist(getUserId(userDetails)));
    }

    @PostMapping
    public ResponseEntity<WatchlistItem> addToWatchlist(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody WatchlistItemDto dto) {
        return ResponseEntity.ok(watchlistService.addToWatchlist(getUserId(userDetails), dto));
    }

    @DeleteMapping("/{tmdbMovieId}")
    public ResponseEntity<Map<String, String>> removeFromWatchlist(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long tmdbMovieId) {
        watchlistService.removeFromWatchlist(getUserId(userDetails), tmdbMovieId);
        return ResponseEntity.ok(Map.of("message", "Removed from watchlist"));
    }

    @GetMapping("/check/{tmdbMovieId}")
    public ResponseEntity<Map<String, Boolean>> checkWatchlist(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long tmdbMovieId) {
        boolean inWatchlist = watchlistService.isInWatchlist(getUserId(userDetails), tmdbMovieId);
        return ResponseEntity.ok(Map.of("inWatchlist", inWatchlist));
    }
}