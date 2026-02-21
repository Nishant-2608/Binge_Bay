package com.bingebay.binge_bay_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "watchlist_items",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "tmdb_movie_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "tmdb_movie_id", nullable = false)
    private Long tmdbMovieId;

    @Column(name = "movie_title", nullable = false)
    private String movieTitle;

    @Column(name = "poster_path")
    private String posterPath;

    @Column(name = "release_date")
    private String releaseDate;

    @Column(name = "vote_average")
    private Double voteAverage;

    @Column(name = "overview", length = 2000)
    private String overview;

    @Column(name = "added_at")
    private LocalDateTime addedAt;

    @PrePersist
    protected void onAdd() {
        addedAt = LocalDateTime.now();
    }
}