package com.bingebay.binge_bay_backend.controller;

import com.bingebay.binge_bay_backend.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final TmdbService tmdbService;

    @GetMapping("/trending/{timeWindow}")
    public ResponseEntity<Map> getTrending(@PathVariable String timeWindow) {
        return ResponseEntity.ok(tmdbService.getTrendingMovies(timeWindow));
    }

    @GetMapping("/popular")
    public ResponseEntity<Map> getPopular(@RequestParam(defaultValue = "1") int page) {
        return ResponseEntity.ok(tmdbService.getPopularMovies(page));
    }

    @GetMapping("/top-rated")
    public ResponseEntity<Map> getTopRated(@RequestParam(defaultValue = "1") int page) {
        return ResponseEntity.ok(tmdbService.getTopRatedMovies(page));
    }

    @GetMapping("/now-playing")
    public ResponseEntity<Map> getNowPlaying(@RequestParam(defaultValue = "1") int page) {
        return ResponseEntity.ok(tmdbService.getNowPlayingMovies(page));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map> getMovieDetails(@PathVariable Long id) {
        return ResponseEntity.ok(tmdbService.getMovieDetails(id));
    }

    @GetMapping("/{id}/trailers")
    public ResponseEntity<Map> getTrailers(@PathVariable Long id) {
        return ResponseEntity.ok(tmdbService.getMovieTrailers(id));
    }

    @GetMapping("/{id}/similar")
    public ResponseEntity<Map> getSimilar(@PathVariable Long id) {
        return ResponseEntity.ok(tmdbService.getSimilarMovies(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Map> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "1") int page) {
        return ResponseEntity.ok(tmdbService.searchMovies(query, page));
    }

    @GetMapping("/genre/{genreId}")
    public ResponseEntity<Map> getByGenre(
            @PathVariable int genreId,
            @RequestParam(defaultValue = "1") int page) {
        return ResponseEntity.ok(tmdbService.getMoviesByGenre(genreId, page));
    }

    @GetMapping("/genres")
    public ResponseEntity<Map> getGenres() {
        return ResponseEntity.ok(tmdbService.getGenres());
    }
}