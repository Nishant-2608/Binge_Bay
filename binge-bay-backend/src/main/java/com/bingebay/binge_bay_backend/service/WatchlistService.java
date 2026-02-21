package com.bingebay.binge_bay_backend.service;

import com.bingebay.binge_bay_backend.dto.WatchlistItemDto;
import com.bingebay.binge_bay_backend.entity.*;
import com.bingebay.binge_bay_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final UserRepository userRepository;

    public List<WatchlistItem> getUserWatchlist(Long userId) {
        return watchlistRepository.findByUserId(userId);
    }

    public WatchlistItem addToWatchlist(Long userId, WatchlistItemDto dto) {
        if (watchlistRepository.existsByUserIdAndTmdbMovieId(userId, dto.getTmdbMovieId())) {
            throw new RuntimeException("Movie already in watchlist");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        WatchlistItem item = new WatchlistItem();
        item.setUser(user);
        item.setTmdbMovieId(dto.getTmdbMovieId());
        item.setMovieTitle(dto.getMovieTitle());
        item.setPosterPath(dto.getPosterPath());
        item.setReleaseDate(dto.getReleaseDate());
        item.setVoteAverage(dto.getVoteAverage());
        item.setOverview(dto.getOverview());

        return watchlistRepository.save(item);
    }

    @Transactional
    public void removeFromWatchlist(Long userId, Long tmdbMovieId) {
        watchlistRepository.deleteByUserIdAndTmdbMovieId(userId, tmdbMovieId);
    }

    public boolean isInWatchlist(Long userId, Long tmdbMovieId) {
        return watchlistRepository.existsByUserIdAndTmdbMovieId(userId, tmdbMovieId);
    }
}